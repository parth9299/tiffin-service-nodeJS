const { sendResponse } = require('../../helper/responsehelper.js');
const { Role } = require('../../models/index.js');

exports.roleList = async(req,res)=>{
   try{
       const role = await Role.findAll();
       return sendResponse(res,200,'Role List fetch Successfully',{list:role});
   }
   catch(err){
      console.log('error',err);
      return  sendResponse(res,500,'Server Error',err);
   }
}
