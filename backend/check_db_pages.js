const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { PageContent } = require('./models/Schemas');
const { pagesData } = require('./data');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const existingPages = await PageContent.find({}, 'slug title');
        console.log("--- EXISTING PAGES IN DB ---");
        existingPages.forEach(p => console.log(`- ${p.title} (${p.slug})`));

        console.log("\n--- PAGES IN DATA.JS ---");
        pagesData.forEach(p => console.log(`- ${p.title} (${p.slug})`));


        // Optional: Seed missing pages
        const missing = pagesData.filter(d => !existingPages.some(e => e.slug === d.slug));
        if (missing.length > 0) {
            console.log("\n--- MISSING PAGES (To be added) ---");
            missing.forEach(p => console.log(`- ${p.title} (${p.slug})`));

            // Seed ONE by ONE to avoid issues
            for (const page of missing) {
                try {
                    await new PageContent(page).save();
                    console.log(`Created: ${page.slug}`);
                } catch (err) {
                    console.error(`Failed to create ${page.slug}:`, err.message);
                }
            }
            console.log("Seeding complete.");

        } else {
            console.log("\nAll data.js pages exist in DB.");
        }

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
