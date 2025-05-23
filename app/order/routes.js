const { createOrder, orderList, orderView, cancelOrder, updateOrder, paymentSuccess } = require("./controller");

exports.routes = (router) => {
    router.post('/createOrder', createOrder);
    router.get('/orderList/:id', orderList);
    router.post('/orderView/:id', orderView);
    router.post('/cancelOrder/:id', cancelOrder);
    router.post('/updateOrder/:id', updateOrder);
    router.post('/paymentSuccess', paymentSuccess);

}