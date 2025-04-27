const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Admin, Role } = require('../../models/index.js');
const { sendEmail } = require('../../helper/mailer.js');

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
        const admin = await Admin.findOne({ where: { email: username} });
        if (!username) {
            return sendResponse(res, 400, 'Admin not found');
        }
        //Generate jwt token for password reset

        let resetToken = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
        console.log('Token', resetToken);

        return sendResponse(res, 200, 'Password reset link', { resetToken });

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
        const admin = await Admin.findOne({ where: { email: tokenVerify.email } });
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
        const { roleId, userName, email, phoneNumber } = req.body;
        if (!roleId || !userName || !email || !phoneNumber) {
            return sendResponse(res, 400, 'All Fields Are Required');
        }

        const alreadyRegisterd = await Admin.findOne({ where: { email } });
        if (alreadyRegisterd) {
            return sendResponse(res, 400, 'This Email is Already Registerd');
        }

        let createAdmin = await Admin.create({
            roleId,
            username: userName,
            email,
            phoneNumber,
            createdBy: 1
        });
        
        let resetToken = jwt.sign({ username: createAdmin.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
        console.log('Token', resetToken);
        await sendEmail(email, 'Reset Password riya', resetToken);
        return sendResponse(res, 200, 'Registartion Successfully Done!!', createAdmin);

    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', err);
    }
}

exports.adminList = async (req, res) => {
    try {
        console.log(req, "reqreq")
        const admin = await Admin.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Role,
                    attributes: ['rolename'],
                    as: 'role'
                }
            ]
        });
        return sendResponse(res, 200, 'Admin List Fetch Successfully', { list: admin });
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', err);

    }
}
exports.adminDelete = async(req,res)=>{
    try{
       const {id} = req.params;
       const admin = await Admin.findOne({where:{id}});
       if(!admin){
          return sendResponse(res,400,'Admin not found');
       }
       await admin.destroy();
       return sendResponse(res,200,'Admin deleted Successfully');
    }
    catch(err){
        console.log('error',err);
        return sendResponse(res,500,'Server Error',null,err);

    }
}