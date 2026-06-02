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

// PUT / Update department data (Secured)
router.put('/:slug', verifyToken, async (req, res) => {
    try {
        const { mission, vision, peo, pso, po, subjects, bosMeetingDate, acMeetingDate, regulation } = req.body;
        
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
