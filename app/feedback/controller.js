const { setDefaultHighWaterMark } = require('nodemailer/lib/xoauth2/index.js');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Feedback } = require('../../models/index.js');

exports.addFeedback = async(req,res)=>{
  console.log(req.body)
   try{
      const {user_id,order_id,ratings,feedback_text,isActive} = req.body;
      if(!user_id){
        return sendResponse(res,400,'User id required');
      }
      if(!order_id){
        return sendResponse(res,400,'Order id is required');
      }
      if(!ratings){
        return sendResponse(res,400,'Ratings is required');
      }
      if(!feedback_text){
        return sendResponse(res,400,'Feedback text is required');
      }
      
      //validate ratings must be between 1 to 5
      if(ratings < 1 || ratings >10){
        return sendResponse(res,400,'Ratings must be between 1 to 10');
      }

      // store feedback in database
      const feedback = await Feedback.create({
        user_id,
        order_id,
        ratings,
        feedback_text,
        isActive
      });
      return sendResponse(res,200,'Feedback Added Successfully!!');
   }
   catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);

   }
}
exports.updateFeedback = async(req,res)=>{
  try{
     const {id} = req.params;
     if(!id){
        return sendResponse(res,400,'Feedback id required');
     }
     const {user_id,order_id,ratings,feedback_text,isActive} = req.body;
    //check ratings must be between 1 to 10
    if(ratings <1 || ratings > 10)
    {
        return sendResponse(res,400,'Ratings must be between 1 to 10');
    }
    // find Feedback id
    const feedback = await Feedback.findOne({where:{id}});
    if(!feedback) {
        return sendResponse(res,400,'Feedback id not found');
    }

    //update the feedback 
    await feedback.update({
        user_id,
        order_id,
        ratings,
        feedback_text,
        isActive
    });
    return sendResponse(res,200,'Feedback Updated Successfully!!',{list:feedback});

  }
  catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);

  }
}
exports.deleteFeedback = async(req,res)=>{
  try{
     const{id} = req.params;
     if(!id){
        return sendResponse(res,400,'Feedback id required');
     }
     const feedback = await Feedback.findOne({where:{id}});
     if(!feedback){
        return sendResponse(res,400,'Feedback id not found');
     }
     await feedback.destroy();
     return sendResponse(res,200,'Feedback Deleted successfully');
  }
  catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);
  }
}
exports.listFeedback = async (req,res)=>{
   try{
     const feedback = await Feedback.findAll();
     return sendResponse(res,200,'Feedback list fetched successfully',{list:feedback});
   }
   catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);

   }
}