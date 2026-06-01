const nodeMailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // 🔴 Ye line Node.js ko force karegi IPv4 use karne ke liye, 
            // jo cloud servers ke IPv6 bugs ko fix karti hai.
            family: 4, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // 🔴 AWAIT lagana mat bhoolna, logs ke mutabiq ye missing lag raha tha
        const info = await transporter.sendMail({
            from: `"BlinkBuy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: body,
        });

        console.log("Email sent: %s", info.messageId);
        return info;

    } catch (error) {
        console.log("Error occur during sending mail", error);
        throw error; 
    }
}