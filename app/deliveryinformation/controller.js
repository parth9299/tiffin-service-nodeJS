const { setDefaultHighWaterMark } = require('nodemailer/lib/xoauth2/index.js');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Deliveryinformation, Order, User, Deliveryperson } = require('../../models/index.js');

exports.addDeliveryInfo = async (req, res) => {
    try {
        const { order_id, user_id, delivery_person_id, deliveryAddress, deliveryDate, deliveryStatus } = req.body;
        if (!order_id || !user_id || !delivery_person_id || !deliveryAddress || !deliveryDate || !deliveryStatus) {
            return sendResponse(res, 400, 'All fields are required');
        }

        //Address length Validation
        if (deliveryAddress.length > 100) {
            return sendResponse(res, 400, 'Delivery address must be 100 character or less');
        }

        //ENUM Validation(only valid status)
        const validStatuses = ['Pending', 'Out for Delivery', 'Delivered'];
        if (!validStatuses.includes(deliveryStatus)) {
            return sendResponse(res, 400, 'Invalid Delivery Status');
        }

        //find order_id is exists or not 
        const order = await Order.findByPk(order_id);
        if (!order) {
            return sendResponse(res, 400, 'Order not found');
        }

        //find user_id is exists or not 
        const user = await User.findByPk(user_id);
        if (!user) {
            return sendResponse(res, 400, 'User not found');
        }

        //delivery person id exists or not 
        const deliveryperson = await Deliveryperson.findByPk(delivery_person_id);
        if (!deliveryperson) {
            return sendResponse(res, 400, 'Delivery person not found');
        }

        //create Delivery Information
        const deliveryinformation = await Deliveryinformation.create({
            order_id,
            user_id,
            delivery_person_id,
            deliveryAddress,
            deliveryDate,
            deliveryStatus: deliveryStatus || 'Pending',
            createdBy: 1,
            createdAt: new Date(),
        });

        return sendResponse(res, 200, 'Delivery Information Added Successfully');
    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
}
exports.updateDeliveryInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_id, user_id, delivery_person_id, deliveryAddress, deliveryDate, deliveryStatus } = req.body;
        if (!id) {
            return sendResponse(res, 400, 'Delivery infromation id required')
        }
        //Address length Validation
        if (deliveryAddress.length > 100) {
            return sendResponse(res, 400, 'Delivery address must be 100 character or less');
        }

        //ENUM Validation(only valid status)
        const validStatuses = ['Pending', 'Out for Delivery', 'Delivered'];
        if (!validStatuses.includes(deliveryStatus)) {
            return sendResponse(res, 400, 'Invalid Delivery Status');
        }

        //find order_id is exists or not 
        const order = await Order.findByPk(order_id);
        if (!order) {
            return sendResponse(res, 400, 'Order not found');
        }

        //find user_id is exists or not 
        const user = await User.findByPk(user_id);
        if (!user) {
            return sendResponse(res, 400, 'User not found');
        }

        //delivery person id exists or not 
        const deliveryperson = await Deliveryperson.findByPk(delivery_person_id);
        if (!deliveryperson) {
            return sendResponse(res, 400, 'Delivery person not found');
        }
        //update delivery information
        await Deliveryinformation.update({
            order_id,
            user_id,
            delivery_person_id,
            deliveryAddress,
            deliveryDate,
            deliveryStatus: deliveryStatus || 'Pending',
            updatedBy: 1,
            updatedAt: new Date()
        },
            { where: { id } }
        );
        return sendResponse(res, 200, 'Delivery Information updated Successfully')

    }
    catch (err) {
        console.log('error', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
}
exports.deleteDeliveryInfo = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return sendResponse(res,400,'Delivery Information Id is required');
        }
        const deliveryinformation = await Deliveryinformation.findOne({where:{id}});
        if(!deliveryinformation){
            return sendResponse(res,400,'Delivery Information not found');
        }
        await deliveryinformation.destroy();
        return sendResponse(res,200,'Delivery Information deleted Successfully')
    }
    catch(err){
        console.log('error',err);
        return sendResponse(res,500,'Server Error',null,err);

    }
}
exports.listDeliveryInfo = async(req,res) =>{
    try{
        const deliveryinformation = await Deliveryinformation.findAll();
        return sendResponse(res,200,'Delivery Information Fetched Successfully',{list:deliveryinformation});
    }
    catch(err){
        console.log('error',err);
        return sendResponse(res,500,'Server Error',null,err);
    }
}