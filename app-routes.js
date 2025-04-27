const authRouter = require('./app/auth/routes');
const roles = require('./app/role/routes');
const tiffin = require('./app/tiffin/routes');
const user = require('./app/user/routes');
const order = require('./app/order/routes');
const feedback = require('./app/feedback/routes');
const subscriptionmanagement = require('./app/subscriptionmanagement/routes');
const subscriptiondetails = require('./app/subscriptiondetails/routes');
const cart = require('./app/cart/routes');
const deliveryperson = require('./app/deliveryperson/routes');
const deliveryinformation = require('./app/deliveryinformation/routes');

 exports.appRoutes=(router)=>{
    authRouter.routes(router);
    roles.routes(router);
    tiffin.routes(router);
    user.routes(router);
    order.routes(router);
    feedback.routes(router);
    subscriptionmanagement.routes(router);
    subscriptiondetails.routes(router);
    cart.routes(router);
    deliveryperson.routes(router);
    deliveryinformation.routes(router);

}   