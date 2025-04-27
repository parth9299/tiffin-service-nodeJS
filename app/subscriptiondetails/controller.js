const { sendResponse } = require('../../helper/responsehelper.js');
const { SubscriptionDetails } = require('../../models/index.js');

exports.addSubscriptionDetails = async (req, res) => {
    try {
        const { user_id, startDate, subscriptionPlanId, subscriptionStatus, paymentStatus, totalAmount } = req.body;
        if (!user_id) {
            return sendResponse(res, 400, 'User Id required');
        }
        if (!startDate) {
            return sendResponse(res, 400, 'Start Date is required');
        }
        if (!subscriptionPlanId) {
            return sendResponse(res, 400, 'Subscription Plan id is required');
        }
        if (!subscriptionStatus) {
            return sendResponse(res, 400, 'Subscription Status is required');
        }
        if (!paymentStatus) {
            return sendResponse(res, 400, 'Payment Status is required');
        }
        if (!totalAmount) {
            return sendResponse(res, 400, 'Total Amount is required');
        }

        // Convert startDate string to Date object
        const start = new Date(startDate);

        // Add 30 days to the startDate
        start.setDate(start.getDate() + 30);

        // Now 'start' contains the date 30 days after the original startDate
        console.log("Start Date + 30 days:", start);
        //create New Details
        const newDetails = await SubscriptionDetails.create({
            user_id,
            startDate,
            endDate:start,
            subscriptionPlanId,
            subscriptionStatus,
            paymentStatus,
            totalAmount,
            createdBy: 1,

        });
        return sendResponse(res, 200, 'Subscription Details Added Succsessfully!!');
    }
    catch (err) {
        console.log('error', err)
        return sendResponse(res, 500, 'Server Error', err);
    }
}
exports.updateSubscriptionDetails = async(req, res) => {
     try{
        const{id} = req.params;
        if(!id){
            return sendResponse(res,200,'Subscription Details Id is required')
        }
        const {user_id, startDate, subscriptionPlanId, subscriptionStatus, paymentStatus, totalAmount} =req.body;
        const subscriptionDetails = await SubscriptionDetails.findOne({where:{id}});
        if(!subscriptionDetails){
            return sendResponse(res,400,'Subscription Details Id not found');
        }
        
        // Convert startDate string to Date object
        const start = new Date(startDate);

        // Add 30 days to the startDate
        start.setDate(start.getDate() + 30);

        // Now 'start' contains the date 30 days after the original startDate
        console.log("Start Date + 30 days:", start);
        await subscriptionDetails.update({
            user_id,
            startDate,
            endDate:start,
            subscriptionPlanId,
            subscriptionStatus,
            paymentStatus,
            totalAmount
        });
        return sendResponse(res,200,'Subscription Details Updated Successfully!!');

     }
     catch(err){
        console.log('error',err);
        return sendResponse(res,500,'Server Error',null,err);
     }
}
// exports.listDetails= async (req,res)=>{
//     try{
//         const listData = await SubscriptionDetails.findAll();
//         return sendResponse(res,200,'Data Fetched Successfully!!',{list:listData});
//     }
//     catch(err){
//        console.log('error',err);
//        return sendResponse(res,500,'Server Error',null,err);
//     }
//  }
exports.listDetails = async (req,res)=>{
    try{
        const listData = await SubscriptionDetails.findAll();
        return sendResponse(res,200,'Data Feteched Successfully!!',{list:listData});
    }
    catch(err){
         console.log ('error',err);
         return sendResponse(res,500,'Server Error',null,err);      
    }
}
