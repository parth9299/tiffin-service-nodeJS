const SendmailTransport = require('nodemailer/lib/sendmail-transport/index.js');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Cart, User, Tiffin } = require('../../models/index.js');

exports.addCart = async (req, res) => {
   try {
      const { user_id, tiffin_id, quantity } = req.body;
      if (!user_id || !tiffin_id || !quantity) {
         return sendResponse(res, 400, 'All Fields are required');
      }
      if (quantity < 1 || quantity > 10) {
         return sendResponse(res, 400, 'Quantity mjust be bewtween 1 to 10');
      }
      //check if user exists or not
      const user = await User.findByPk(user_id);
      if (!user) {
         return sendResponse(res, 400, 'User not found');
      }
      const tiffin = await Tiffin.findByPk(tiffin_id);
      if (!tiffin) {
         return sendResponse(res, 400, 'Tiffin not found');
      }
      //Calculate total price
      const price = tiffin.price;
      const totalPrice = quantity * price;

      const cartItem = await Cart.create({
         user_id,
         tiffinId: tiffin_id,
         quantity,
         price,
         totalPrice,
         createdAt: new Date()
      })
      return sendResponse(res, 200, 'Item added to cart Successfully!!', cartItem);
   }
   catch (err) {
      console.log('error', err);
      return sendResponse(res, 500, 'Sever error', null, err);

   }
}
exports.updateCart = async (req, res) => {
   try {
      const { id } = req.params;
      if (!id) {
         return sendResponse(res, 400, 'Cart id is required');
      }
      const { tiffin_id, quantity } = req.body;
      if (!tiffin_id || !quantity) {
         return sendResponse(res, 400, 'All fields are required');
      }
      if (quantity < 1 || quantity > 10) {
         return sendResponse(res, 400, 'Quantity must be bewtween 1 to 10');
      }

      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
         return sendResponse(res, 404, 'Cart item not found');
      }

      const tiffin = await Tiffin.findByPk(tiffin_id);
      if (!tiffin) {
         return sendResponse(res, 400, 'tiffin id not found');
      }

      //Calculate total price
      const price = tiffin.price;
      const totalPrice = quantity * price;

      //update the cart
      await cartItem.update({ quantity, totalPrice });

      return sendResponse(res, 200, 'Cart Updated Successfully!!', cartItem);

   }
   catch (err) {
      console.log('error', err)
      return sendResponse(res, 500, 'Server error', null, err);
   }
}
exports.deleteCart = async (req, res) => {
   try {
      const { id } = req.params;
      const cart = await Cart.findOne({ where: { id } });
      if (!id) {
         return sendResponse(res, 400, 'Cart id is required');
      }
      await cart.destroy();
      return sendResponse(res, 200, 'Cart deleted Successfully!!');
   }
   catch (err) {
      console.log('error', err);
      return sendResponse(res, 500, 'Server Error', null, err);

   }
}
// exports.cartList = async(req,res)=>{
//    try{
//        const cart = await cart.findAll();
//        return sendResponse(res,200,'Cart List fetch Successfully',{list:cart});
//    }
//    catch(err){
//       console.log('error',err);
//       return sendResponse(res,500,'Server Error',err);
//    }
// }
exports.cartList = async (req, res) => {
   try {
      const { userId } = req.body
      const cart = await Cart.findAll({
         where: { user_id: userId },

         include: [
            {
               model: Tiffin,
               as: 'Tiffin',
            }
         ]
      });
      const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);
      return sendResponse(res, 200, 'Cart list fetched successfully', { list: cart ,totalAmount});
   }
   catch (err) {
      console.log('error', err);
      return sendResponse(res, 500, 'Server Error', null, err);

   }
}