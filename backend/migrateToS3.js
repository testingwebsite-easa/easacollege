const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('./config/s3');
const { FacultyStat, NewsEvent, HeroSlide, GalleryImage, PlacementPartner, ManagementMember, Program, UGCourse, Department, ResearchItem, Admission } = require('./models/Schemas');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PUBLIC_IMAGES_DIR = path.join(__dirname, 'public/images');

const modelsToScan = [
    { model: NewsEvent, fields: ['image'] },
    { model: HeroSlide, fields: ['image'] },
    { model: GalleryImage, fields: ['src'] },
    { model: PlacementPartner, fields: ['logo'] },
    { model: ManagementMember, fields: ['image_url'] },
    { model: Program, fields: ['image'] },
    { model: UGCourse, fields: ['image'] },
    { model: Department, fields: ['heroImage', 'hod.image'] }, // Nested field handling needed
    { model: ResearchItem, fields: ['image'] }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await migrateImages();
    } catch (err) {
        console.error("DB Connection Error:", err);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

const uploadFileToS3 = async (filePath, filename) => {
    try {
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${filename}`,
            Body: fileContent,
            ContentType: getContentType(filename)
        };

        // Use the imported configured s3 client directly, or create a command
        // The s3 client from config/s3.js is v3 style
        // We need to use Send command

        await s3.send(new PutObjectCommand(params));

        // Construct the URL
        const region = process.env.AWS_REGION;
        const bucket = process.env.AWS_BUCKET_NAME;
        // Standard S3 URL format
        return `https://${bucket}.s3.${region}.amazonaws.com/images/${filename}`;
    } catch (err) {
        console.error(`S3 Upload Error for ${filename}:`, err.message);
        return null;
    }
};

const getContentType = (filename) => {
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.pdf')) return 'application/pdf';
    return 'application/octet-stream';
};

const migrateImages = async () => {
    console.log("Starting Migration...");

    for (const { model, fields } of modelsToScan) {
        console.log(`Scanning ${model.modelName}...`);
        const documents = await model.find();

        for (const doc of documents) {
            let modified = false;

            for (const field of fields) {
                // Handle nested fields like 'hod.image'
                const isNested = field.includes('.');
                let currentUrl;

                if (isNested) {
                    const parts = field.split('.');
                    if (doc[parts[0]] && doc[parts[0]][parts[1]]) {
                        currentUrl = doc[parts[0]][parts[1]];
                    } else {
                        continue;
                    }
                } else {
                    currentUrl = doc[field];
                }

                // Check if URL is local (contains /images/) and NOT already S3
                if (currentUrl && currentUrl.includes('/images/') && !currentUrl.includes('amazonaws.com') && !currentUrl.includes('s3')) {
                    const filename = currentUrl.split('/images/').pop();
                    const localFilePath = path.join(PUBLIC_IMAGES_DIR, filename);

                    if (fs.existsSync(localFilePath)) {
                        console.log(`Found local file: ${filename}. Uploading to S3...`);
                        const s3Url = await uploadFileToS3(localFilePath, filename);

                        if (s3Url) {
                            if (isNested) {
                                const parts = field.split('.');
                                doc[parts[0]][parts[1]] = s3Url;
                            } else {
                                doc[field] = s3Url;
                            }
                            modified = true;
                            console.log(`Updated URL to: ${s3Url}`);

                            // Delete local file
                            try {
                                fs.unlinkSync(localFilePath);
                                console.log(`Deleted local file: ${localFilePath}`);
                            } catch (e) {
                                console.error("Failed to delete local file:", e.message);
                            }
                        }
                    } else {
                        console.warn(`File not found locally for URL: ${currentUrl}`);
                    }
                }
            }

            if (modified) {
                await doc.save();
            }
        }
    }
    console.log("Migration Completed.");
};

connectDB();
