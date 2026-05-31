exports.otpEmailTemplate = (otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlinkBuy OTP Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f6f9fc;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #f97316, #ea580c);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .content {
            padding: 30px;
        }
        .otp-box {
            text-align: center;
            background: #fff7ed;
            padding: 20px;
            border: 1px dashed #fdba74;
            border-radius: 6px;
            margin: 20px 0;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 6px;
            color: #ea580c;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            padding: 20px;
            background: #f1f3f4;
            color: #64748b;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="header">
            <h1 style="margin:0;">BlinkBuy</h1>
            <p style="margin:5px 0 0;">Your One-Stop Shop for Everything!</p>
        </div>

        <div class="content">
            <h2 style="color: #1e293b;">Confirm Your Identity</h2>

            <p>Hi there,</p>

            <p>Thank you for choosing <strong>BlinkBuy</strong>. To complete your sign-up or verify your transaction, please use the One-Time Password (OTP) provided below:</p>

            <div class="otp-box">
                <p style="margin:0; font-weight:bold; color: #475569;">Verification Code</p>
                <div class="otp">${otp}</div>
                <p style="color:#ef4444; font-size: 13px; margin: 10px 0 0;">This code is valid for 5 minutes only.</p>
            </div>

            <p>If you didn't request this code, you can safely ignore this email. Someone might have typed your email address by mistake.</p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

            <p style="font-size:14px; color:#64748b;">
                Need assistance? Our support team is here for you:<br/>
                <strong>support.blinkbuy@gmail.com</strong>
            </p>

            <p style="font-size:13px; color:#94a3b8; font-style: italic;">
                🛡️ For security reasons, never share this code with anyone, including BlinkBuy employees.
            </p>
        </div>

        <div class="footer">
            <p>© 2026 BlinkBuy Marketplace. All rights reserved.</p>
            <p>Designed with excellence for your convenience.</p>
        </div>

    </div>
</body>
</html>
`
}