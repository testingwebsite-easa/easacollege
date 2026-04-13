const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (options) => {
    try {
        const info = await transporter.sendMail({
            from: `EASA College <${process.env.SMTP_USER}>`,
            ...options
        });
        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Email Sending Error:", error);
        throw error;
    }
};

module.exports = { transporter, sendEmail };
