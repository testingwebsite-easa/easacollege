const mongoose = require('mongoose');
require('dotenv').config();
const { Department, UGCourse } = require('./models/Schemas');

const inspectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const departments = await Department.find({}, 'slug name');
        console.log("\n--- DEPARTMENTS ---");
        departments.forEach(d => console.log(`Slug: ${d.slug} | Name: ${d.name}`));

        const courses = await UGCourse.find({}, 'title');
        console.log("\n--- UG COURSES ---");
        courses.forEach(c => console.log(`Title: ${c.title}`));

        process.exit(0);
    } catch (err) {
        console.error("Error inspecting DB:", err);
        process.exit(1);
    }
};

inspectDB();
