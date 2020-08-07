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
            let sum = 0;
            let cartdetails = data1.filter((data1) => {
              if (data1.isActive === true) {
                sum = sum + data1.quantity * data1.product_id.price;
                return data1;
              }
            });
            customerService
              .getCustomerById(customerdetail)
              .then((data) => {
                let filterData = {
                  user_id: req.user_id,
                  total_amount: sum,
                  shipping_address: data._id,
                };
                orderModel
                  .create(filterData)
                  .then((data1) => {
                    cartdetails.filter((cartdetails) => {
                      let detail = {
                        order_id: data1._id,
                        product_id: cartdetails.product_id._id,
                        quantity: cartdetails.quantity,
                      };
                      orderModel
                        .createOrder(detail)
                        .then((data) => {
                          resolve(data1);
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    });
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
