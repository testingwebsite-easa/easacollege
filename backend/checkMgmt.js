const mongoose = require('mongoose');
const path = require('path');
const { ManagementMember } = require('./models/Schemas');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const checkMgmt = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const members = await ManagementMember.find();
        console.log(JSON.stringify(members, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

checkMgmt();
