const Razorpay = require('razorpay');
const { sendResponse } = require('../../helper/responsehelper.js');
const { Order, OrderItem, User, Cart, Tiffin } = require('../../models/index.js');

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_gEREBntUWy5mmQ",
  key_secret: "vhLJ0LxwyHPdPOFR9ORmvKbJ",
});
exports.createOrder = async (req, res) => {
  try {
    console.log(req.body, "req.body")
    const { totalPrice, userId, address } = req.body;
    if (!userId) {
      return sendResponse(res, 400, 'User id is required');
    }

    if (!address) {
      return sendResponse(res, 400, 'Address is required');
    }
    if (!totalPrice) {
      return sendResponse(res, 400, 'Total Price is required');
    }

    // Fetch user and cart details
    const user = await User.findByPk(userId);
    const cart = await Cart.findAll({
      where: { user_id: userId },
      raw: true
    });

    if (!user) {
      return sendResponse(res, 400, "User not found");
    }
    if (!cart) {
      return sendResponse(res, 400, "Cart not found");
    }


    // Create order in the database
    const order = await Order.create({
      userId: userId,
      address,
      totalPrice,
      status: "created",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(cart, "cartcart")
    // Now, add the items in the order_items table
    const orderItems = [];
    for (const item of cart) {
      console.log(item, "itemitemitem")
      const tiffin = await Tiffin.findByPk(item.tiffin_id);
      if (!tiffin) {
        return sendResponse(res, 400, `Tiffin with ID ${item.tiffin_id} not found`);
      }

      orderItems.push({
        order_id: order.id,
        tiffin_id: item.tiffin_id,
        quantity: item.quantity,
        price: tiffin.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert all items into the order_items table
    await OrderItem.bulkCreate(orderItems);

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: totalPrice * 100,  // Razorpay expects the amount in paise
      currency: "INR",
      receipt: `order_${Math.floor(Math.random() * 1000000)}`,
    });
console.log(razorpayOrder,"razorpayOrder")
    // Update the order with Razorpay order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();


    return sendResponse(res, 200, "Order created successfully", {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
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
exports.paymentSuccess = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Find the order by Razorpay orderId
    const existingOrder = await Order.findOne({
      where: { razorpayOrderId: razorpayOrderId }
    });

    if (!existingOrder) {
      return sendResponse(res,404, "Order not found");
    }

    // Update the order with payment info
    existingOrder.payment_status = "Paid";
    existingOrder.razorpayPaymentId = razorpayPaymentId;
    existingOrder.razorpaySignature = razorpaySignature;

    await existingOrder.save();

    return sendResponse(res,200, "Order updated successfully");
  } catch (error) {
    return sendResponse(res,500,  "Something went wrong",error);
  }
}