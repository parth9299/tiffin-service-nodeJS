const { sendResponse } = require('../../helper/responsehelper.js');
const { SubscriptionManagement } = require('../../models/index.js');

exports.addSubscription = async (req, res) => {
    try {
        const { planname, plandescription, plantype, price, meals_per_day } = req.body;
        if (!planname) {
            return sendResponse(res, 400, 'Plan Name is required');
        }
        if (!plandescription) {
            return sendResponse(res, 400, 'Plan Description is required');
        }
        if (!plantype) {
            return sendResponse(res, 400, 'Plan type is required');
        }
        if (!price) {
            return sendResponse(res, 400, 'Price is required');
        }
        if (!meals_per_day) {
            return sendResponse(res, 400, 'Meals Per Day is required');
        }
        //create new subscription plan
        const subscription = await SubscriptionManagement.create({
            planname,
            plandescription,
            plantype,
            price,
            meals_per_day,
            createdBy: 1
        });
        return sendResponse(res, 200, 'Subscription Added Successfully!!');

    }
    catch (err) {
        console.log(res, 500, 'Server Error', null, err);
    }
}
exports.updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return sendResponse(res, 400, 'Subscription management id required');
        }

        const { planname, plandescription, plantype, price, meals_per_day } = req.body;
        const subManagement = await SubscriptionManagement.findOne({ where: { id } });

        if (!subManagement) {
            return sendResponse(res, 400, 'Subscription Management ID not found');
        }

        if (meals_per_day < 1 || meals_per_day > 3) {
            return sendResponse(res, 400, 'Meals per day must be between 1 and 3');
        }

        await subManagement.update({
            planname,
            plandescription,
            plantype,
            price,
            meals_per_day
        });

        return sendResponse(res, 200, 'Subscription Management Updated Successfully',{list:subManagement});
    } catch (err) {
        console.log('Error:', err);
        return sendResponse(res, 500, 'Server Error', null, err);
    }
};
exports.deleteSubscription= async(req,res)=>{
   try{
     const{id} = req.params;
     const subManagement = await SubscriptionManagement.findOne({ where: { id } });
     if(!id){
        return sendResponse(res,400,'Subscription management id required');
     }
     await subManagement.destroy();
     return sendResponse(res,200,'Data Deleted Successfully!!');
   }
   catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);
   }
}
exports.listManagement= async (req,res)=>{
   try{
       const listData = await SubscriptionManagement.findAll();
       return sendResponse(res,200,'Data Fetched Successfully!!',{list:listData});
   }
   catch(err){
      console.log('error',err);
      return sendResponse(res,500,'Server Error',null,err);
   }
}
