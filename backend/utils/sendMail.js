const nodeMailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp-relay.brevo.com", // 🔴 Changed from Gmail to Brevo
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            // 🔴 Sender name aur email
            from: `"BlinkBuy Support" <${process.env.EMAIL_USER}>`, 
            to: email,
            subject: subject,
            html: body,
        });

        console.log("Email successfully sent via Brevo!");
        return info;
    } catch (error) {
        console.error("Brevo Error:", error.message);
        throw error;
    }
};