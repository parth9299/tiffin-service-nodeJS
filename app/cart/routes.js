const {addCart, updateCart, deleteCart, cartList} = require("./controller");

exports.routes = (router) => {
    router.post('/addCart', addCart);
    router.post('/updateCart/:id',updateCart);
    router.post('/deleteCart/:id',deleteCart);
    router.post('/cartList',cartList);
}