const mongoose = require('mongoose');
require('dotenv').config();

const { Department } = require('./models/Schemas');

async function fixDepartmentTypes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const depts = await Department.find({});
        console.log(`Found ${depts.length} departments.`);

        for (const dept of depts) {
            // Fix corrupted type if present, or ensure it's set
            if (!dept.type || dept.type.length > 5 || dept.type === 'UGctronics-engineeri') {
                console.log(`Fixing department: ${dept.name}`);
                dept.type = 'UG'; // Default to UG
                await dept.save();
                console.log("Saved.");
            }
        }

        console.log("Done.");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

fixDepartmentTypes();
