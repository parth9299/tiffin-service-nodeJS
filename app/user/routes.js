const { userRegister, userLogin, userForgot,userReset, userList } = require("./controller");


exports.routes = (router) => {
    router.post('/userRegister', userRegister);
    router.post('/userLogin',userLogin);
    router.post('/userForgot',userForgot);
    router.post('/userReset',userReset);
    router.get('/userList',userList);
}