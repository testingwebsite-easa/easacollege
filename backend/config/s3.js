const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
// Fallback to parent dir if needed (for local dev structure variations)
if (!process.env.AWS_ACCESS_KEY_ID) {
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");

            let folder = 'uploads';
            if (file.fieldname === 'resume') folder = 'resumes';
            else if (file.fieldname === 'image') folder = 'images';

            cb(null, `${folder}/${uniqueSuffix}-${cleanName}`);
        }
    }),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

module.exports = { uploadS3, s3 };
