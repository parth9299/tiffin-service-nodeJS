const { sendResponse } = require('../../helper/responsehelper.js');
const { Order, User, Tiffin } = require('../../models/index.js');

exports.createOrder = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return sendResponse(res, 400, 'User id is required');
    }
    const { tiffin_id } = req.body;
    if (!tiffin_id) {
      return sendResponse(req, 400, 'Tiffin is is required');
    }
    const { quantity } = req.body;
    if (!quantity) {
      return sendResponse(res, 400, 'Quantity is required');
    }
    const { address } = req.body;
    if (!address) {
      return sendResponse(res, 400, 'Address is required');
    }
    const { totalPrice } = req.body;
    if (!totalPrice) {
      return sendResponse(res, 400, 'Total Price is required');
    }
    console.log('req.body', req.body);
    //find user_id and tiffin_id
    const userExist = await User.findByPk(user_id); x
    if (!userExist) {
      return sendResponse(res, 400, 'User id not found');
    }
    const tiffinExist = await Tiffin.findByPk(tiffin_id);
    if (!tiffinExist) {
      return sendResponse(res, 400, 'Tiffin id is required');
    }
    if (quantity < 1 || quantity > 10) {
      return sendResponse(res, 400, 'Quantity must be between 1 to 10');
    }
    // create order
    const createOrder = await Order.create({
      user_id,
      tiffin_id,
      quantity,
      address,
      totalPrice,
      createdBy: user_id,
      createdAt: new Date()
    });

    return sendResponse(res, 200, 'Your order has been created successfully!!', createOrder);

  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server Error', null, err);
  }
}
exports.orderList = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 500, 'Order id not found');
    }
    const order = await Order.findAll({ where: { user_id: id } });
    {
      return sendResponse(res, 200, 'Order List fetched successfully', { list: order });
    }
  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server Error', null, err);
  }
}
exports.orderView = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, 'Order id not found');
    }
    const orderView = await Order.findAll({ where: { id: id } });
    {
      return sendResponse(res, 200, 'Data fetched Successfully', { list: orderView });
    }
  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server error', null, err);

  }
}
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return sendResponse(res, 400, 'Order id not found');
    }
    await order.destroy();
    return sendResponse(res, 200, 'Order deleted successfully');
  }
  catch (err) {
    console.log('error', err)
    return sendResponse(res, 500, 'Server Error', null, err);
  }
}
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 200, 'Order id is required')
    }
    const { user_id, tiffin_id, quantity, address, totalPrice, } = req.body;
    if (!user_id) {
      return sendResponse(res, 400, 'User id not found');
    }
    if (!tiffin_id) {
      return sendResponse(res, 400, 'Tiffin id not found');
    }
    if (!quantity) {
      return sendResponse(res, 400, 'Quantity is Required');
    }
    if (!address) {
      return sendResponse(res, 400, 'Address is Required');
    }
    if (!totalPrice) {
      return sendResponse(res, 400, 'Total price is Required');
    }
    const userExist = await User.findOne({ where: { id: user_id } });
    if (!userExist) {
      return sendResponse(res, 400, 'User id not found');
    }
    const orderExist = await Order.findOne({ where: { id: id } });
    if (!orderExist) {
      return sendResponse(res, 400, 'Order id not found');
    }
    const tiffinExist = await Tiffin.findOne({ where: { id: tiffin_id } });
    if (!tiffinExist) {
      return sendResponse(res, 400, 'Tiffin id not found');
    }

    //update the order 
    const updatedOrder = await Order.update(
      {
        user_id,
        tiffin_id,
        quantity,
        address,
        totalPrice
      },
      { where: { id } }
    );

    return sendResponse(res, 200, 'Order updated successfully');
  }
  catch (err) {
    console.log('error', err);
    return sendResponse(res, 500, 'Server Error', null, err);

  }
}
