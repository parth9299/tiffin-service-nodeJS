const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// import dotenv from 'dotenv';
dotenv.config();

 async function sendEmail(
    to_email,
    mail_subject,
    mail_message,
    mail_cc,
    attachments
) {
    if (!to_email || !mail_subject || !mail_message) {
        return false;
    }
    console.log(to_email, "to_email")
    const payload = {
        name: process.env.MAIL_HOST,
        host: process.env.MAIL_HOST,
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        from_name: process.env.MAIL_FROM_NAME,
        from_email: process.env.MAIL_FROM_EMAIL,
    };

    try {
        let email = {
            name: payload.name,
            host: payload.host,
            port: payload.port * 1,
            secure: payload.secure,
            auth: {
                user: payload.username,
                pass: payload.password,
            },
        };

        let transporter = nodemailer.createTransport(email);

        let maildata = {
            from: `${payload.from_email}`,
            to: Array.isArray(to_email) ? to_email.join(', ') : to_email,
            subject: mail_subject,
            html: mail_message,
            cc: Array.isArray(mail_cc) ? mail_cc.join(', ') : mail_cc,
            attachments: attachments || [] // Ensure attachments array is always defined
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(maildata, (err, info) => {
                if (err) {
                    console.error("Error sending email:", err);
                    resolve(false);
                } else {
                    console.log("Email sent successfully:", info.response);
                    resolve(true);
                }
            });
        });
    } catch (error) {
        console.error("Exception sending email:", error);
        return false;
    }
};
module.exports = { sendEmail };
