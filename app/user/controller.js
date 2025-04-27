const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator =  require('validator');
const { sendResponse } = require('../../helper/responsehelper.js');
const { User } = require('../../models/index.js');
const { setDefaultHighWaterMark } = require('nodemailer/lib/xoauth2/index.js');

exports.userRegister = async (req, res) => {
    try {
        let { firstName, lastName, email, phone_number, address } = req.body;
        if (!firstName || !lastName || !email || !phone_number || !address) {
            return sendResponse(res, 400, 'All Fields are required');
        }
        if (!validator.isEmail(email)) {
            return sendResponse(res, 400, 'Invalid email format');
        }
        //check if email is already registerd
        const alreadyRegisterd = await User.findOne({ where: { email } });
        console.log('alreadyRegisterd', alreadyRegisterd);
        if (alreadyRegisterd) {
            return sendResponse(res, 400, 'Email is already registerd');
        }
        //creating new user
        let createUser = await User.create({
            firstName,
            lastName,
            email,
            phone_number,
            address
        });
        const token = jwt.sign({ id: createUser.id, email: createUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token', token)


        return sendResponse(res, 200, 'Registration Successfully!!', { token });
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', err);
    }
}
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('req.body', req.body);
        if (email == null || password == null) {
            return sendResponse(res, 400, 'Username and password are required');
        }
        if (!validator.isEmail(email)) {
            return sendResponse(res, 400, 'Invalid email format');
        }
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return sendResponse(res, 400, 'User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 400, 'Invalid Credentials');
        }
        // generate JWT token
        const token = jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('token', token);
        user = {
            id: user.user_id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
        return sendResponse(res, 200, 'Login Successfully', user)
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);

    }
}
exports.userForgot = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('req.body', req.body);
        if (!email) {
            return sendResponse(res, 400, 'Email is required');
        }
        if (!validator.isEmail(email)) {
            return sendResponse(res, 400, 'Invalid email format');
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendResponse(res, 400, 'User not found');
        }
        let resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log('Token', resetToken);

        //create reset password URL
         
        return sendResponse(res, 200, 'Password reset link', { resetToken });
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server  Error', null, err);

    }
}
exports.userReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token) {
            return sendResponse(res, 400, 'Token is required');
        }
        if (!newPassword) {
            return sendResponse(res, 400, 'newPassword is required');
        }
        //token verify
        let tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenVerify) {
            return sendResponse(res, 400, 'Token is Invalid');
        }
        // Extract user info from the token (assuming email is included in the token)
        const email = tokenVerify.email;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendResponse(res, 400, 'User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save(); 

        return sendResponse(res, 200, 'Password reset successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);

    }
}

exports.userList = async (req, res) => {
    try {
        const user = await User.findAll();
        return sendResponse(res, 200, 'User List fetch Successfully', { list: user });
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', err);
    }
}
