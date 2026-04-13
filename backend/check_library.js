require('dotenv').config();
const mongoose = require('mongoose');
const { LibraryData, PageContent } = require('./models/Schemas');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const lib = await LibraryData.findOne();
        console.log("--- LIBRARY DATA ---");
        console.log(JSON.stringify(lib?.overview?.image, null, 2));

        const page = await PageContent.findOne({ slug: 'library' });
        console.log("--- PAGE CONTENT (slug: library) ---");
        console.log(JSON.stringify(page?.heroImage, null, 2));

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
