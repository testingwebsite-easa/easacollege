const cloudinary = require('cloudinary').v2;
require('dotenv').config();

console.log("Testing Cloudinary Connection...");
console.log(`Cloud Name: '${process.env.CLOUDINARY_CLOUD_NAME}'`);
console.log(`API Key: '${process.env.CLOUDINARY_API_KEY}'`);
console.log(`API Secret Length: ${process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.length : 0}`);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.api.ping((error, result) => {
    if (error) {
        console.error("Connection Failed:", error);
    } else {
        console.log("Connection Successful:", result);
    }
});
