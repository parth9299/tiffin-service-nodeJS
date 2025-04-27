const { addDeliveryInfo, updateDeliveryInfo,deleteDeliveryInfo, listDeliveryInfo} = require("./controller");

exports.routes = (router) => {
    router.post('/addDeliveryInfo',addDeliveryInfo);
    router.post('/updateDeliveryInfo/:id',updateDeliveryInfo);
    router.post('/deleteDeliveryInfo/:id',deleteDeliveryInfo);
    router.get('/listDeliveryInfo',listDeliveryInfo);
}