const model = require("../model/order.js");
const customerService = require("../services/customerDetail.js");
const cartService = require("../services/cart.js");
const cart = new cartService();
let orderModel = new model();
module.exports = class bookService {
  addOrder(req) {
    try {
      return new Promise((resolve, reject) => {
        cart
          .getCart({ user_id: req.user_id })
          .then((data1) => {
            let customerdetail = {
              user_id: req.user_id,
            };
            customerService
              .getCustomerById(customerdetail)
              .then((data) => {
                let filterData = {
                  user_id: req.user_id,
                  total_amount: req.total_amount,
                  shipping_address: data._id,
                };
                orderModel
                  .create(filterData, data1)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
        // cart
        //   .addPrice(req.user_id)
        //   .then((data) => {
        //     console.log(data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     reject(err);
        //   });
      });
    } catch (err) {
      return err;
    }
  }
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
