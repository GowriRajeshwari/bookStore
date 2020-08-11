const model = require("../model/orderDetails.js");
const logger = require("../logger/logger.js");
let orderModel = new model();
module.exports = class bookService {
  getOrder(req) {
    try {
      return new Promise((resolve, reject) => {
        orderModel
          .findOrder(req)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return err;
    }
  }
};
