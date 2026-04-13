const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Faculty } = require('./models/Schemas');

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const distinctDepts = await Faculty.distinct('department');
        const results = [];

        for (const dept of distinctDepts) {
            const count = await Faculty.countDocuments({ department: dept });
            results.push({ department: dept, count });
        }

        console.log(JSON.stringify(results, null, 2));
        fs.writeFileSync(path.join(__dirname, 'faculty_check.json'), JSON.stringify(results, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();
