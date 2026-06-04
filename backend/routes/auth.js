const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models/Schemas');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_EXPIRATION = '7d';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token', details: err.message });
        }
        req.user = decoded;
        next();
    });
};

// Simple password hashing (for production, use bcrypt)
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const verifyPassword = (inputPassword, hashedPassword) => {
    return hashPassword(inputPassword) === hashedPassword;
};

// REGISTER - Create new user account
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role, department, employeeId, studentId, name, phone } = req.body;

        // Validation
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'Username, email, password, and role are required' });
        }

        if (!['admin', 'hod', 'staff', 'student'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be admin, hod, staff, or student' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new user
        const hashedPassword = hashPassword(password);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            department: role !== 'admin' ? department : undefined,
            employeeId: role === 'staff' ? employeeId : undefined,
            studentId: role === 'student' ? studentId : undefined,
            name,
            phone,
            isApproved: role === 'admin' ? true : false // Admin auto-approved, others need approval
        });

        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
                role: newUser.role,
                email: newUser.email,
                isApproved: newUser.isApproved
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                isApproved: newUser.isApproved
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});

// LOGIN - Authenticate user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify password
        if (!verifyPassword(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check if user is approved (except admins)
        if (user.role !== 'admin' && !user.isApproved) {
            return res.status(403).json({ error: 'Your account is pending approval by admin' });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                isApproved: user.isApproved
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        return res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                name: user.name,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

// LOGOUT - Simply invalidate token on client (token still valid on server until expiration)
router.post('/logout', verifyToken, (req, res) => {
    return res.json({ message: 'Logout successful' });
});

// GET PROFILE - Get current user profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// VERIFY TOKEN - Check if token is valid
router.get('/verify', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            valid: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                name: user.name,
                department: user.department,
                isApproved: user.isApproved
            }
        });
    } catch (err) {
        console.error('Verify error:', err);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// ADMIN: Get all pending approvals
router.get('/pending-approvals', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can view pending approvals' });
        }

        const pendingUsers = await User.find({ isApproved: false }).select('-password');
        res.json({ pendingUsers });
    } catch (error) {
        console.error('Pending approvals error:', error);
        res.status(500).json({ error: 'Failed to fetch pending approvals' });
    }
});

// ADMIN: Approve user
router.post('/approve-user/:userId', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can approve users' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { isApproved: true, updatedAt: new Date() },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User approved successfully', user });
    } catch (error) {
        console.error('Approve user error:', error);
        res.status(500).json({ error: 'Failed to approve user' });
    }
});

// ADMIN: Reject/Delete user
router.delete('/reject-user/:userId', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can reject users' });
        }

        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User rejected successfully' });
    } catch (error) {
        console.error('Reject user error:', error);
        res.status(500).json({ error: 'Failed to reject user' });
    }
});

// ADMIN: Create a new user (auto-approved)
router.post('/admin-create-user', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can create users directly' });
        }

        const { username, email, password, role, department, employeeId, studentId, name, phone } = req.body;

        // Validation
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'Username, email, password, and role are required' });
        }

        if (!['admin', 'hod', 'staff', 'student'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be admin, hod, staff, or student' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new user (automatically approved since created by admin)
        const hashedPassword = hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            department: role !== 'admin' ? department : undefined,
            employeeId: role === 'staff' ? employeeId : undefined,
            studentId: role === 'student' ? studentId : undefined,
            name,
            phone,
            isApproved: true // Admin created, so auto-approve
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                isApproved: newUser.isApproved
            }
        });
    } catch (error) {
        console.error('Admin create user error:', error);
        res.status(500).json({ error: 'User creation failed', details: error.message });
    }
});

module.exports = { router, verifyToken };
