module.exports = {
  sendResponse: (res, statusCode, message, data = {},error) => {
    return res.status(statusCode).send({ message: message, data:data, error });
  },
};