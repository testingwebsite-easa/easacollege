const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('./config/s3');
const {
    NewsEvent, HeroSlide, GalleryImage, PlacementPartner,
    ManagementMember, Program, UGCourse, Department,
    ResearchItem, JobApplication, PageContent
} = require('./models/Schemas');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PUBLIC_IMAGES_DIR = path.join(__dirname, 'public/images');

const models = [
    NewsEvent, HeroSlide, GalleryImage, PlacementPartner,
    ManagementMember, Program, UGCourse, Department,
    ResearchItem, JobApplication, PageContent
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await completeMigration();
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

        await s3.send(new PutObjectCommand(params));

        const region = process.env.AWS_REGION;
        const bucket = process.env.AWS_BUCKET_NAME;
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

const processedFiles = new Set();

const completeMigration = async () => {
    if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
        console.log("No images directory found.");
        return;
    }

    const files = fs.readdirSync(PUBLIC_IMAGES_DIR);
    console.log(`Found ${files.length} remaining files to process.`);

    for (const filename of files) {
        if (processedFiles.has(filename)) continue;

        const filePath = path.join(PUBLIC_IMAGES_DIR, filename);
        // Skip directories if any
        if (fs.lstatSync(filePath).isDirectory()) continue;

        console.log(`Processing file: ${filename}`);
        const s3Url = await uploadFileToS3(filePath, filename);

        if (!s3Url) {
            console.error(`Failed to upload ${filename}. Skipping...`);
            continue;
        }

        console.log(`Uploaded to: ${s3Url}. Updating references in DB...`);
        let referenceFound = false;

        for (const Model of models) {
            const docs = await Model.find();

            for (const doc of docs) {
                let docModified = false;
                const scanAndReplace = (obj) => {
                    for (const key in obj) {
                        if (typeof obj[key] === 'string') {
                            if (obj[key].includes(filename)) {
                                if (obj[key].includes('amazonaws.com')) continue;
                                console.log(`Found reference in ${Model.modelName} [${key}]: ${obj[key]}`);
                                obj[key] = s3Url;
                                docModified = true;
                                referenceFound = true;
                            }
                        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                            if (obj[key]._id) continue;
                        }
                    }
                };
                const docData = doc.toObject();
                const checkAndUpdate = (path, val) => {
                    if (val && typeof val === 'string' && val.includes(filename) && !val.includes(s3Url)) {
                        console.log(`Updating ${Model.modelName} ${doc._id} [${path}]`);
                        doc.set(path, s3Url);
                        docModified = true;
                        referenceFound = true;
                    }
                };
                for (const key of Object.keys(docData)) {
                    if (typeof docData[key] === 'string') {
                        checkAndUpdate(key, docData[key]);
                    } else if (Array.isArray(docData[key])) {
                        docData[key].forEach((item, idx) => {
                            if (typeof item === 'string') checkAndUpdate(`${key}.${idx}`, item);
                            else if (typeof item === 'object') {
                                for (const subKey in item) {
                                    if (typeof item[subKey] === 'string') {
                                        checkAndUpdate(`${key}.${idx}.${subKey}`, item[subKey]);
                                    }
                                }
                            }
                        });
                    } else if (typeof docData[key] === 'object' && docData[key] !== null) {
                        for (const subKey in docData[key]) {
                            if (typeof docData[key][subKey] === 'string') {
                                checkAndUpdate(`${key}.${subKey}`, docData[key][subKey]);
                            }
                        }   
                    }
                }
                
                if (docModified) {
                    await doc.save();
                }
            }
        }

        if (referenceFound) {
            console.log(`References updated for ${filename}. Deleting local file.`);
        } else {
            console.log(`No DB references found for ${filename}. Deleting anyway as per request (cleanup).`);
        }

        try {
            fs.unlinkSync(filePath);
        } catch (e) {
            console.error(`Error deleting ${filename}:`, e.message);
        }

        processedFiles.add(filename);
    }
};

connectDB();
