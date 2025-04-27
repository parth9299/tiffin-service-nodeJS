const {addFeedback, updateFeedback,deleteFeedback,listFeedback} = require("./controller");

exports.routes = (router) => {
    router.post('/addFeedback', addFeedback);
    router.post('/updateFeedback/:id',updateFeedback);
    router.post('/deleteFeedback/:id',deleteFeedback);
    router.get('/listFeedback',listFeedback);
    
}