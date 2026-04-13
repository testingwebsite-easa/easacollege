const mongoose = require('mongoose');
require('dotenv').config();

const { Department } = require('./models/Schemas');

async function checkDepartments() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const depts = await Department.find({});
        console.log(`Found ${depts.length} departments:`);
        depts.forEach(d => {
            console.log(`- Name: ${d.name}, Slug: ${d.slug}, Type: ${d.type}`);
        });

        if (depts.length === 0) {
            console.log("WARNING: No departments found in DB!");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkDepartments();
