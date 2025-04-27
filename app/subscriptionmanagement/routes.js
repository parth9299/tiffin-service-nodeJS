const {addSubscription,updateSubscription,deleteSubscription,listManagement} = require("./controller");

exports.routes = (router) => {
     router.post('/addSubscription',addSubscription);
     router.post('/updateSubscription/:id',updateSubscription);
     router.post('/deleteSubscription/:id',deleteSubscription);
     router.get('/listManagement',listManagement);
}