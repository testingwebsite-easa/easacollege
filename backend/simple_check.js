const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { PageContent } = require('./models/Schemas');

const CORE_PAGES = [
    'hostel', 'sports', 'amenities', 'fest', 'cells',
    'associations', 'clubs', 'wellness', 'cafeteria', 'food-court'
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected.");

        const pages = await PageContent.find({}, 'slug');
        const existingSlugs = pages.map(p => p.slug);

        console.log("Existing Slugs:", existingSlugs);

        for (const slug of CORE_PAGES) {
            if (!existingSlugs.includes(slug)) {
                console.log(`Creating missing page: ${slug}`);
                await new PageContent({
                    slug: slug,
                    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
                    subtitle: 'Manage this page in Admin Panel',
                    heroImage: '',
                    content: 'Default content.',
                    sections: []
                }).save();
            } else {
                console.log(`Exists: ${slug}`);
            }
        }
        console.log("Done.");
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}

run();
