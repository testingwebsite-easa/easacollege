const mongoose = require('mongoose');
const path = require('path');
const { ManagementMember, NewsEvent } = require('./models/Schemas');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const verifyMigration = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Verification");

        const members = await ManagementMember.find();
        console.log("Management Members Image URLs:");
        members.forEach(m => console.log(`- ${m.name}: ${m.image_url}`));

        const news = await NewsEvent.find();
        console.log("News Events Image URLs (First 3):");
        news.slice(0, 3).forEach(n => console.log(`- ${n.title}: ${n.image}`));

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.disconnect();
    }
};

verifyMigration();
