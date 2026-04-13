const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Faculty, GalleryEvent, GalleryImage, ResearchItem, NewsEvent, Career, Alumni } = require('./models/Schemas');

const departmentSlugMapping = {
    "cse": "computer-science-and-engineering",
    "ece": "electronics-and-communication-engineering",
    "mech": "mechanical-engineering",
    "eee": "electrical-and-electronics-engineering",
    "me-cse": "me-computer-science-and-engineering",
    "mba": "master-of-business-administration",
    "ai-ml": "artificial-intelligence-and-machine-learning",
    "ai-ds": "artificial-intelligence-and-data-science",
    "cse-cyber-security": "computer-science-and-engineering-cyber-security",
    "biomedical": "biomedical-engineering",
    "it": "information-technology",
    "agri": "agriculture-engineering",
    "construction-mgmt": "construction-engineering-and-management",
    "manufacturing": "manufacturing-engineering",
    "ped": "power-electronics-and-drives",
    "structural": "structural-engineering"
};

const migrate = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const collections = [
            { model: Faculty, field: 'department', name: 'Faculty' },
            { model: GalleryEvent, field: 'department', name: 'GalleryEvent' },
            { model: GalleryImage, field: 'department', name: 'GalleryImage' },
            { model: ResearchItem, field: 'department', name: 'ResearchItem' },
            { model: NewsEvent, field: 'category', name: 'NewsEvent' },
            { model: Career, field: 'department', name: 'Career' },
            { model: Alumni, field: 'department', name: 'Alumni' }
        ];

        for (const { model, field, name } of collections) {
            console.log(`Migrating ${name}...`);
            let count = 0;
            for (const [oldSlug, newSlug] of Object.entries(departmentSlugMapping)) {
                const result = await model.updateMany(
                    { [field]: oldSlug },
                    { $set: { [field]: newSlug } }
                );
                if (result.modifiedCount > 0) {
                    console.log(`  Updated ${result.modifiedCount} records from '${oldSlug}' to '${newSlug}'`);
                    count += result.modifiedCount;
                }
            }
            console.log(`Finished ${name}. Total updated: ${count}`);
        }

        console.log('Migration complete.');
        process.exit(0);

    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

migrate();
