const {addTiffin, editTiffin, deleteTiffin, listTiffin,temporaryUnavailable} = require("./controller");

exports.routes = (router) => {
    router.post('/addTiffin', addTiffin);
    router.post('/editTiffin/:id',editTiffin);
    router.post('/deleteTiffin/:id',deleteTiffin);
    router.get('/listTiffin',listTiffin);
    router.post('/temporaryUnavailable',temporaryUnavailable);
}