const {addTiffin, editTiffin, deleteTiffin, listTiffin,temporaryUnavailable, tiffins} = require("./controller");

exports.routes = (router) => {
    router.post('/addTiffin', addTiffin);
    router.post('/editTiffin/:id',editTiffin);
    router.post('/deleteTiffin/:id',deleteTiffin);
    router.post('/listTiffin',listTiffin);
    router.post('/tiffins',tiffins);
    router.post('/temporaryUnavailable',temporaryUnavailable);
}