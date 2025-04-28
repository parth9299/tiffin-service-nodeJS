const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Admin, Role } = require('../../models/index.js');
const { sendEmail } = require('../../helper/mailer.js');
const { Op } = require('sequelize');
const { generateResetPasswordEmail } = require('../../helper/emailTemplate.js');

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('req.body', req.body);
        if (username == null || password == null) {
            return sendResponse(res, 400, 'Username and Password are required');
        }

        if (!validator.isEmail(username)) {
            return sendResponse(res, 400, 'Invalid email format');
        }
        let admin = await Admin.findOne({ where: { email: username } });
        if (!admin) {
            return sendResponse(res, 400, 'Admin  not found');
        }
        //compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return sendResponse(res, 400, 'Invalid Credentials');
        }
        //generate JWT token
        const token = jwt.sign({ id: admin.id, username: admin.username, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        //send response with admin details
        admin = {
            admin_id: admin.admin_id,
            username: admin.username,
            email: admin.email,
            token: token
        }
        return sendResponse(res, 200, 'Login Successfully', admin);
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err)
    }
}
exports.adminForgot = async (req, res) => {
    try {
        const { username } = req.body;
        console.log('req.body', req.body);
        if (!username) {
            return sendResponse(res, 400, 'Username is required');
        }

        if (!validator.isEmail(username)) {
            return sendResponse(res, 400, 'Invalid email format');
        }

        //find the admin in database
        const admin = await Admin.findOne({ where: { email: username }, raw:true });
        console.log(admin.username, "adminadminadmin")
        if (!username) {
            return sendResponse(res, 400, 'Admin not found');
        }
        //Generate jwt token for password reset

        let resetToken = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log('Token', resetToken);
        const htmlTemplate = generateResetPasswordEmail(admin.username, `http://localhost:3000/reset/${resetToken}`)
        await sendEmail(admin.email, 'Reset Password ', htmlTemplate);
        return sendResponse(res, 200, 'Password reset link',);

    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err)
    }
}
exports.adminReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token) {
            return sendResponse(res, 400, 'Token required');
        }
        if (!newPassword) {
            return sendResponse(res, 400, 'password  is required');
        }
        // Verify the token
        let tokenVerify;
        try {
            tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error('Token verification failed:', err);  // Log error
            return sendResponse(res, 400, 'Invalid Token');
        }
        console.log(tokenVerify, "tokenVerify")
        const admin = await Admin.findOne({ where: { email: tokenVerify.username } });
        if (!admin) {
            return sendResponse(res, 400, 'Admin not found');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password in the database
        admin.password = hashedPassword;
        await admin.save();  // Save the updated password

        // Send success response
        return sendResponse(res, 200, 'Password Reset Successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
}
exports.adminRegister = async (req, res) => {
    try {
        const { id, roleId, username, email, phoneNumber } = req.body;

        if (!roleId || !username || !email || !phoneNumber) {
            return sendResponse(res, 400, 'All Fields Are Required');
        }

        // Check if the email already exists, but allow update if it's the same email for the same user
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin && existingAdmin.id !== id) {
            return sendResponse(res, 400, 'This Email is Already Registered');
        }

        let adminData;

        if (id) {
            // If id exists, update the existing admin
            const adminToUpdate = await Admin.findOne({ where: { id } });
            if (!adminToUpdate) {
                return sendResponse(res, 400, 'Admin not found');
            }
            adminData = await adminToUpdate.update({
                roleId,
                username,
                email,
                phoneNumber
            });
            return sendResponse(res, 200, 'Admin updated successfully', adminData);
        } else {
            // If no id exists, create a new admin
            adminData = await Admin.create({
                roleId,
                username,
                email,
                phoneNumber,
                createdBy: 1
            });

            // Generate reset token for the newly created admin
            let resetToken = jwt.sign({ username: adminData.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const htmlTemplate = generateResetPasswordEmail(username, `http://localhost:3000/reset/${resetToken}`)
            await sendEmail(email, 'Reset Password Link', htmlTemplate);
            return sendResponse(res, 200, 'Registration Successfully Done!!', adminData);
        }
    } catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', err);
    }
};

exports.adminList = async (req, res) => {

    try {
        console.log(req.body.searchText)
        let page = 0;
        let limit = 0;
        if (req.body.pagination.page > 0) {
            page = Number.parseInt(req.body.pagination.page - 1);
        }
        if (req.body.pagination.limit) {
            limit = Number.parseInt(req.body.pagination.limit);
        }

        let whereCondition = {};

        if (req.body.searchText) {
            const searchValues = Array.isArray(req.body.searchText)
                ? req.body.searchText
                : [req.body.searchText];

            whereCondition = {
                [Op.or]: [
                    { username: { [Op.in]: searchValues } },
                    { email: { [Op.in]: searchValues } },
                    { phoneNumber:{[Op.in]: searchValues }},
                ]
            };
        }
        let totalPages = 0;
        let totalRecords;
        let admin = [];
        admin = await Admin.findAndCountAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Role,
                    attributes: ['rolename'],
                    as: 'role'
                }
            ],
            limit: limit,
            offset: page * limit
        });

        if (admin?.rows?.length > 0) {
            totalRecords = admin.count;
            totalPages = Math.ceil(totalRecords / limit);
            admin = admin.rows;
        } else {
            admin = admin;
        }

        return sendResponse(res, 200, 'Admin List Fetch successfully', {
            list: admin, totalPages: totalPages,
            currentPage: page,
            totalRecords: totalRecords,
        });
    }

    catch (err) {
        console.log('error'.err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
    //     try {
    //         const admin = await Admin.findAll({
    //             attributes: {
    //                 exclude: ['password']
    //             },
    //             include: [
    //                 {
    //                     model: Role,
    //                     attributes: ['rolename'],
    //                     as: 'role'
    //                 }
    //             ]
    //         });
    //         return sendResponse(res, 200, 'Admin List Fetch Successfully', { list: admin });
    //     }
    //     catch (err) {
    //         console.log('error', err);
    //         return sendResponse(res, 500, 'Server Error', err);

    //     }
}

exports.adminDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findOne({ where: { id } });
        if (!admin) {
            return sendResponse(res, 400, 'Admin not found');
        }
        await admin.destroy();
        return sendResponse(res, 200, 'Admin deleted Successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);

    }
}