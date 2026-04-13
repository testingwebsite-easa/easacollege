
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Department } = require('../models/Schemas');
const { departmentsData } = require('../data');

const seedDepartments = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('Checking departments...');

        // Parallelize department seeding
        await Promise.all(departmentsData.map(async (deptData) => {
            const existing = await Department.findOne({ slug: deptData.slug });

            if (existing) {
                console.log(`Updating existing department: ${deptData.slug} `);
                await Department.updateOne({ slug: deptData.slug }, deptData);
            } else {
                console.log(`Creating new department: ${deptData.slug} `);
                await Department.create(deptData);
            }
        }));

        console.log('Department seeding completed.');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding departments:', err);
        process.exit(1);
    }
};

seedDepartments();
