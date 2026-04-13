const mongoose = require('mongoose');
require('dotenv').config();

const { Department } = require('./models/Schemas');

async function checkDepartmentsShort() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const depts = await Department.find({}, 'name type slug');
        console.log("DEPARTMENTS LIST START");
        console.log(JSON.stringify(depts, null, 2));
        console.log("DEPARTMENTS LIST END");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkDepartmentsShort();
