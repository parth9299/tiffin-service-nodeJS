const {addSubscriptionDetails,updateSubscriptionDetails,listDetails} = require("./controller");

exports.routes = (router) => {
     router.post('/addSubscriptionDetails',addSubscriptionDetails);
     router.post('/updateSubscriptionDetails/:id',updateSubscriptionDetails);
     router.get('/listDetails',listDetails); 
}