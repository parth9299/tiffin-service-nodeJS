const {addPersonInfo,updatePersonInfo,deletePersonInfo,listPersonInfo } = require("./controller");

exports.routes = (router) => {
    router.post('/addPersonInfo', addPersonInfo);
    router.post('/updatePersonInfo/:id',updatePersonInfo );
    router.post('/deletePersonInfo/:id',deletePersonInfo );
    router.get('/listPersonInfo',listPersonInfo);

}