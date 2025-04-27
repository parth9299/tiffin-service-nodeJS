const { sendResponse } = require('../../helper/responsehelper.js');
const { Deliveryperson } = require('../../models/index.js');

exports.addPersonInfo = async (req, res) => {
  try {
    const { name, contactNumber, } = req.body;
    if (!name || !contactNumber) {
      return sendResponse(res, 400, 'All fileds are required')
    }
    const deliveryPerson = await Deliveryperson.create({
      name,
      contactNumber,
      createdBy: 1,
      createdAt: new Date()
    });
    return sendResponse(res, 200, 'Delivery person added Successully!!');
  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server Error', null, err);
  }
}
exports.updatePersonInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactNumber } = req.body;
    if (!id) {
      return sendResponse(res, 400, 'Delivery person id is required');
    }

    //find the delivery person by id 
    const deliveryPerson = await Deliveryperson.findByPk(id);
    if (!deliveryPerson) {
      return sendResponse(res, 400, 'Delivery person not found');
    }
    await deliveryPerson.update({
      name,
      contactNumber,
      updatedBy: 1,
      updatedAt: new Date()
    });
    return sendResponse(res, 200, 'Delivery Person updated Successfully')

  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server Error', null, err);

  }
}
exports.deletePersonInfo = async(req,res)=>{
  try{
     const {id} = req.params;
     const deliveryPerson = await Deliveryperson.findByPk(id);
     if(!deliveryPerson){
      return sendResponse(res,400,'Delivery person id is not found');
     }
    await deliveryPerson.destroy();
    return sendResponse(res,200,'Delivery person deleted Successfully!!');
  }
  catch(err){
     return sendResponse(res,500,'Server Error',null,err);
  }
}
exports.listPersonInfo = async(req,res)=>{
   try{
     const deliveryPerson = await Deliveryperson.findAll();
     return sendResponse(res,200,'Delivery person list fetched successfully',{list:deliveryPerson});
   }
   catch(err){
    console.log('error',err);
    return sendResponse(res,500,'Server Error',null,err);
   }
}