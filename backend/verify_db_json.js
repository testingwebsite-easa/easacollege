const mongoose = require('mongoose');
require('dotenv').config();

const { Department } = require('./models/Schemas');

async function checkDepartments() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const depts = await Department.find({});
        console.log(JSON.stringify(depts, null, 2));

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkDepartments();
