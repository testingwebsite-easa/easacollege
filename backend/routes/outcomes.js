const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Get the ProgramOutcome model (will be injected or required from Schemas)
let ProgramOutcome;

const setProgramOutcomeModel = (model) => {
    ProgramOutcome = model;
};

// Middleware to check authentication and role
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    // Token verification would be done here in production
    // For now, we'll assume the token is valid
    next();
};

const authorizeAdminHOD = (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== 'admin' && userRole !== 'hod') {
        return res.status(403).json({ error: 'Access denied. Admin or HOD only.' });
    }
    next();
};

// GET /api/outcomes - Fetch outcomes for a department
router.get('/', authenticate, async (req, res) => {
    try {
        const { department } = req.query;
        
        if (!department) {
            return res.status(400).json({ error: 'Department parameter is required' });
        }

        const outcomes = await ProgramOutcome.find({ department });

        // Group outcomes by type
        const groupedOutcomes = {
            PO: outcomes.filter(o => o.type === 'PO'),
            PEO: outcomes.filter(o => o.type === 'PEO'),
            PSO: outcomes.filter(o => o.type === 'PSO'),
            WK: outcomes.filter(o => o.type === 'WK')
        };

        res.json(groupedOutcomes);
    } catch (err) {
        console.error('Error fetching outcomes:', err);
        res.status(500).json({ error: 'Failed to fetch outcomes' });
    }
});

// GET /api/outcomes/:type - Fetch specific type of outcomes for a department
router.get('/:type', authenticate, async (req, res) => {
    try {
        const { type } = req.params;
        const { department } = req.query;

        if (!department) {
            return res.status(400).json({ error: 'Department parameter is required' });
        }

        if (!['PO', 'PEO', 'PSO', 'WK'].includes(type)) {
            return res.status(400).json({ error: 'Invalid outcome type' });
        }

        const outcomes = await ProgramOutcome.find({ department, type }).sort({ code: 1 });
        res.json(outcomes);
    } catch (err) {
        console.error('Error fetching outcomes:', err);
        res.status(500).json({ error: 'Failed to fetch outcomes' });
    }
});

// POST /api/outcomes/save - Create or update an outcome
router.post('/save', authenticate, authorizeAdminHOD, async (req, res) => {
    try {
        const { department, type, outcome } = req.body;

        if (!department || !type || !outcome) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['PO', 'PEO', 'PSO', 'WK'].includes(type)) {
            return res.status(400).json({ error: 'Invalid outcome type' });
        }

        let savedOutcome;

        if (outcome.id && !outcome.id.startsWith('new-')) {
            // Update existing outcome
            savedOutcome = await ProgramOutcome.findByIdAndUpdate(
                outcome.id,
                {
                    code: outcome.code,
                    title: outcome.title,
                    description: outcome.description,
                    updatedAt: new Date(),
                    lastModifiedBy: req.user?.id
                },
                { new: true }
            );
        } else {
            // Create new outcome
            const newOutcome = new ProgramOutcome({
                department,
                type,
                code: outcome.code,
                title: outcome.title,
                description: outcome.description,
                createdBy: req.user?.id
            });
            savedOutcome = await newOutcome.save();
        }

        res.json({ success: true, outcome: savedOutcome });
    } catch (err) {
        console.error('Error saving outcome:', err);
        res.status(500).json({ error: 'Failed to save outcome' });
    }
});

// DELETE /api/outcomes/:id - Delete an outcome
router.delete('/:id', authenticate, authorizeAdminHOD, async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if it's a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid outcome ID' });
        }

        const deletedOutcome = await ProgramOutcome.findByIdAndDelete(id);

        if (!deletedOutcome) {
            return res.status(404).json({ error: 'Outcome not found' });
        }

        res.json({ success: true, message: 'Outcome deleted successfully' });
    } catch (err) {
        console.error('Error deleting outcome:', err);
        res.status(500).json({ error: 'Failed to delete outcome' });
    }
});

// EXPORT
module.exports = {
    router,
    setProgramOutcomeModel
};
