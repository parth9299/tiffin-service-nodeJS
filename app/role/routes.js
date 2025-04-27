const { roleList} = require("./controller");

exports.routes = (router) => {
    router.get('/roleList', roleList);

}