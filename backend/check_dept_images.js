const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Department } = require('./models/Schemas');

const checkImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const slugsToCheck = ['mechanical-engineering', 'electronics-and-communication-engineering', 'computer-science-and-engineering-cyber-security', 'agriculture-engineering', 'manufacturing-engineering'];
        const departments = await Department.find({ slug: { $in: slugsToCheck } }).select('slug name heroImage');

        fs.writeFileSync('dept_images_check.json', JSON.stringify(departments, null, 2));
        console.log('Data written to dept_images_check.json');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkImages();
