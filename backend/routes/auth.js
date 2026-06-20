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
    if (hashedPassword && hashedPassword.includes(':')) {
        // PBKDF2 check (used by index.js seeded users/admin)
        const [salt, key] = hashedPassword.split(':');
        const hash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512').toString('hex');
        return key === hash;
    }
    // Check if simple SHA-256 match
    if (hashPassword(inputPassword) === hashedPassword) {
        return true;
    }
    // Fallback: plain text check
    return inputPassword === hashedPassword;
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

// FORGOT PASSWORD - Generate token and send email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User with this email does not exist' });
        }

        // Generate reset token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // Send Email
        const origin = req.headers.origin || 'http://localhost:5173';
        const resetUrl = `${origin}/reset-password?token=${token}`;
        
        const mailOptions = {
            to: user.email,
            subject: 'EASA College - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #764ba2; text-align: center;">EASA College</h2>
                    <p>Dear ${user.name || user.username},</p>
                    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #888888; text-align: center;">EASA College Syllabus Management System</p>
                </div>
            `
        };

        // In development/local testing, log the link to a local file
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(__dirname, '../reset_links.log');
        const logMessage = `[${new Date().toISOString()}] Email: ${user.email} | Link: ${resetUrl}\n`;
        fs.appendFileSync(logPath, logMessage);
        console.log(`PASSWORD RESET LINK GENERATED for ${user.email}: ${resetUrl}`);

        try {
            const { sendEmail } = require('../config/email');
            await sendEmail(mailOptions);
            res.json({ message: 'Password reset link sent to your email' });
        } catch (mailError) {
            console.error('SMTP Email sending failed, but token was successfully generated:', mailError.message);
            res.json({ 
                message: 'Password reset link generated! Check backend/reset_links.log (Email delivery failed: ' + mailError.message + ')' 
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to generate reset link', details: error.message });
    }
});

// RESET PASSWORD - Verify token and update password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        // Set the new password
        user.password = hashPassword(newPassword);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password', details: error.message });
    }
});

module.exports = { router, verifyToken };
