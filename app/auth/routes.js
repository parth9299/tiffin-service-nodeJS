const { adminLogin, adminForgot,adminReset, adminRegister, adminList, adminDelete} = require("./controller");


exports.routes = (router) => {
    router.post('/adminLogin', adminLogin);
    router.post('/adminForgot',adminForgot);
    router.post('/adminReset',adminReset);
    router.post('/adminRegister',adminRegister);
    router.post('/adminList',adminList);
    router.post('/adminDelete/:id',adminDelete);
}