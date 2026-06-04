const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');

// Assuming Schemas is imported where DepartmentData is exported
const { DepartmentData } = require('../models/Schemas');
const { getDepartmentDetails } = require('../controllers/departmentController');

// Middleware for auth
const { verifyToken } = require('./auth'); 

// GET department data by slug
router.get('/:slug', async (req, res) => {
    try {
        const data = await DepartmentData.findOne({ departmentSlug: req.params.slug });
        if (!data) {
            return res.json({ mission: [], vision: [], peo: [], pso: [], po: [] });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const getDeptSlug = (userDeptName) => {
    if (!userDeptName) return '';
    const lower = userDeptName.toLowerCase().trim();
    
    // Direct matches
    if (lower === 'computer-science-and-engineering' || lower === 'computer science and engineering') return 'computer-science-and-engineering';
    if (lower === 'electronics-and-communication-engineering' || lower === 'electronics and communication engineering') return 'electronics-and-communication-engineering';
    if (lower === 'mechanical-engineering' || lower === 'mechanical engineering') return 'mechanical-engineering';
    if (lower === 'electrical-and-electronics-engineering' || lower === 'electrical and electronics engineering') return 'electrical-and-electronics-engineering';
    if (lower === 'me-computer-science-and-engineering' || lower === 'me computer science and engineering') return 'me-computer-science-and-engineering';
    if (lower === 'master-of-business-administration' || lower === 'master of business administration') return 'master-of-business-administration';
    if (lower === 'artificial-intelligence-and-machine-learning' || lower === 'artificial intelligence and machine learning' || lower === 'ai & ml' || lower === 'ai ml' || lower === 'aiml') return 'artificial-intelligence-and-machine-learning';
    if (lower === 'artificial-intelligence-and-data-science' || lower === 'artificial intelligence and data science' || lower === 'aids' || lower === 'ai & ds' || lower === 'ai ds') return 'artificial-intelligence-and-data-science';
    if (lower === 'computer-science-and-engineering-cyber-security' || lower === 'computer science and engineering cyber security' || lower === 'cyber security') return 'computer-science-and-engineering-cyber-security';
    if (lower === 'biomedical-engineering' || lower === 'biomedical engineering' || lower === 'biomedical') return 'biomedical-engineering';
    if (lower === 'information-technology' || lower === 'information technology') return 'information-technology';
    if (lower === 'agriculture-engineering' || lower === 'agriculture engineering') return 'agriculture-engineering';
    if (lower === 'construction-engineering-and-management' || lower === 'construction engineering and management') return 'construction-engineering-and-management';
    if (lower === 'manufacturing-engineering' || lower === 'manufacturing engineering') return 'manufacturing-engineering';
    if (lower === 'power-electronics-and-drives' || lower === 'power electronics and drives') return 'power-electronics-and-drives';
    if (lower === 'structural-engineering' || lower === 'structural engineering') return 'structural-engineering';

    // Abbreviations
    if (lower === 'cse') return 'computer-science-and-engineering';
    if (lower === 'eee') return 'electrical-and-electronics-engineering';
    if (lower === 'ece') return 'electronics-and-communication-engineering';
    if (lower === 'it') return 'information-technology';
    if (lower === 'bme') return 'biomedical-engineering';
    if (lower === 'mech') return 'mechanical-engineering';
    if (lower === 'agri') return 'agriculture-engineering';
    if (lower === 'mba') return 'master-of-business-administration';

    // Substring contains
    if (lower.includes('data science') || lower.includes('aids')) return 'artificial-intelligence-and-data-science';
    if (lower.includes('machine learning') || lower.includes('ai-ml')) return 'artificial-intelligence-and-machine-learning';
    if (lower.includes('cyber')) return 'computer-science-and-engineering-cyber-security';
    if (lower.includes('computer') || lower.includes('cse')) return 'computer-science-and-engineering';
    if (lower.includes('electrical') || lower.includes('eee')) return 'electrical-and-electronics-engineering';
    if (lower.includes('electronics') || lower.includes('ece')) return 'electronics-and-communication-engineering';
    if (lower.includes('info') || lower.includes('it')) return 'information-technology';
    if (lower.includes('biomedical') || lower.includes('bme')) return 'biomedical-engineering';
    if (lower.includes('mechanical') || lower.includes('mech')) return 'mechanical-engineering';
    if (lower.includes('agriculture') || lower.includes('agri')) return 'agriculture-engineering';

    return '';
};

// PUT / Update department data (Secured)
router.put('/:slug', verifyToken, async (req, res) => {
    try {
        const { mission, vision, peo, pso, po, subjects, bosMeetingDate, acMeetingDate, regulation } = req.body;
        
        // HOD Authorization Check
        if (req.user.role === 'hod') {
            const { User } = require('../models/Schemas');
            const dbUser = await User.findById(req.user.userId);
            if (!dbUser) {
                return res.status(401).json({ error: 'User not found' });
            }
            const allowedSlug = getDeptSlug(dbUser.department);
            if (!allowedSlug || allowedSlug !== req.params.slug) {
                return res.status(403).json({ error: 'You are only authorized to manage your own department: ' + dbUser.department });
            }
        } else if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to update department curriculum' });
        }
        
        // Find and update, or create if it doesn't exist
        const updatedData = await DepartmentData.findOneAndUpdate(
            { departmentSlug: req.params.slug },
            { 
                mission: mission || [], 
                vision: vision || [], 
                peo: peo || [], 
                pso: pso || [], 
                po: po || [],
                subjects: subjects || [],
                bosMeetingDate: bosMeetingDate || "29.10.2024",
                acMeetingDate: acMeetingDate || "25.11.2024",
                regulation: regulation || "R-2023"
            },
            { new: true, upsert: true }
        );
        
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ error: 'Server error while updating' });
    }
});

// New endpoint for credit distribution details
router.get('/:slug/details', getDepartmentDetails);

module.exports = router;
