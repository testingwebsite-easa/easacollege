const mongoose = require('mongoose');
const path = require('path');
const { PageContent } = require('./models/Schemas');

// Load env vars from CURRENT directory (backend/)
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Check if URI is loaded
if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI not found in .env file at " + path.join(__dirname, '.env'));
    // Fallback if needed, but better to fail if not found
    // process.exit(1); 
} else {
    console.log("Found MONGODB_URI in .env");
}

const mongoURI = MONGODB_URI || 'mongodb://localhost:27017/easa_college';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected');
        await seedPages();
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const pagesToSync = [
    {
        slug: 'library',
        title: 'Central Library',
        subtitle: 'The Knowledge Nexus',
        heroImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop',
        content: `Step into a world of limitless knowledge.
Our library is more than just books; it's a sanctuary for scholars and free thinkers.
With digital archives, silent zones, and collaborative spaces, it's designed to fuel your intellect.`,
        sections: [
            {
                heading: 'Digital Resources',
                body: "Access thousands of e-journals, research papers, and audiobooks at your fingertips.\nStay connected to the global academic community with high-speed internet access.\nKnowledge, digitized.",
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Reading Lounge',
                body: "A cozy, quiet space to get lost in a good book.\nComfortable seating, ambient lighting, and zero distractions.\nThe perfect escape.",
                image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2015&auto=format&fit=crop'
            }
        ]
    },
    {
        slug: 'hostel',
        title: 'Student Hostels',
        subtitle: 'Your Home Away From Home',
        heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop',
        content: `Experience the best of community living.
Our hostels provide a safe, secure, and vibrant environment where lifelong friendships are forged.
Comfortable rooms, nutritious food, and recreational facilities make your stay memorable.`,
        sections: [
            {
                heading: 'Premium Accommodation',
                body: "Spacious, well-ventilated rooms with modern amenities.\nChoose from single, double, or shared occupancy to suit your preference.\nLive in style.",
                image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop'
            },
            {
                heading: 'Recreation & Fun',
                body: "Common rooms equipped with TV, indoor games, and lounge areas.\nUnwind after a long day of classes with your hostel mates.\nFun never ends.",
                image: 'https://images.unsplash.com/photo-1511882150382-421056ac8d89?q=80&w=2070&auto=format&fit=crop'
            }
        ]
    }
];

const seedPages = async () => {
    try {
        if (pagesToSync.length === 0) {
            console.log('No pages found to sync');
            return;
        }

        for (const page of pagesToSync) {
            console.log(`Syncing page: ${page.slug}...`);
            await PageContent.findOneAndUpdate(
                { slug: page.slug },
                page,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Successfully synced: ${page.slug}`);
        }
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding pages:', error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};
