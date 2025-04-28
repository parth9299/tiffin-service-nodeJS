const generateResetPasswordEmail = (userName, resetLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Tiffin Management</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding-bottom: 20px;">
                <h1>Tiffin Service</h1>
            </div>
            <div style="color: #333; font-size: 16px;">
                <p style="margin-bottom: 20px;">Dear ${userName},</p>
                <p style="margin-bottom: 20px;">We received a request to reset the password for your Tiffin Management account. If you didn't request a password reset, please ignore this email.</p>
                <p style="margin-bottom: 20px;">To reset your password, click the button below:</p>
                <p style="margin-bottom: 20px;">
                    <a href="${resetLink}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px; text-align: center;">Reset Password</a>
                </p>
                <p style="margin-bottom: 20px;">If you have any questions, feel free to reach out to our support team at <a href="mailto:support@tiffinmanagement.com" style="color: #4CAF50;">support@tiffinmanagement.com</a>.</p>
                <p style="margin-bottom: 0;">Thank you for using Tiffin Management!</p>
            </div>
            <div style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                <p style="margin: 0;">&copy; 2025 Tiffin Management. All rights reserved.</p>
                <p style="margin: 0;"><a href="http://localhost:3000" style="color: #4CAF50; text-decoration: none;">Visit our website</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const generateDefaultPasswordEmail = (userName, defaultPassword, loginLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Created - Tiffin Management</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding-bottom: 20px;">
                <h1>Tiffin Management</h1>
            </div>
            <div style="color: #333; font-size: 16px;">
                <p style="margin-bottom: 20px;">Dear ${userName},</p>
                <p style="margin-bottom: 20px;">Welcome to Tiffin Management! Your account has been created successfully.</p>
                <p style="margin-bottom: 20px;">Your default password is: <strong>${defaultPassword}</strong></p>
                <p style="margin-bottom: 20px;">To access your account, click the button below:</p>
                <p style="margin-bottom: 20px;">
                    <a href="${loginLink}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px; text-align: center;">Login Now</a>
                </p>
               <p style="margin-bottom: 20px;">If you have any questions, feel free to reach out to our support team at <a href="mailto:support@tiffinmanagement.com" style="color: #4CAF50;">support@tiffinmanagement.com</a>.</p>
                <p style="margin-bottom: 0;">Thank you for using Tiffin Management!</p>
            </div>
            <div style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                <p style="margin: 0;">&copy; 2025 Tiffin Management. All rights reserved.</p>
                <p style="margin: 0;"><a href="http://localhost:3000" style="color: #4CAF50; text-decoration: none;">Visit our website</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { generateDefaultPasswordEmail, generateResetPasswordEmail };
