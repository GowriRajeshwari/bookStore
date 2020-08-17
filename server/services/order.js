const model = require("../model/order.js");
const orderDetail = require("../model/orderDetails.js");
const customerService = require("../services/customerDetail.js");
const cartService = require("../services/cart.js");
const AdminService = require("../services/admin.js");
const logger = require("../logger/logger.js");
const cart = new cartService();
const admin = new AdminService();
let orderModel = new model();
let orderDetailModel = new orderDetail();
module.exports = class bookService {
  addOrder(req) {
    try {
      return new Promise((resolve, reject) => {
        cart
          .getCart({ user_id: req.user_id })
          .then((cartData) => {
            let customerdetail = {
              user_id: req.user_id,
            };
            let sum = 0;
            if (cartData.length > 0) {
              let cartdetails = cartData.filter((cartData) => {
                if (cartData.isActive === true) {
                  sum = sum + cartData.quantity * cartData.product_id.price;
                  return cartData;
                }
                return null;
              });
              if (cartdetails.length != 0) {
                this.addOrderDetail(customerdetail, cartdetails, sum)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                reject({ message: "No Product in cart" });
              }
            } else {
              reject({ message: "No Product in cart" });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return err;
    }
  }
  addOrderDetail(customerdetail, cartdetails, sum) {
    try {
      return new Promise((resolve, reject) => {
        customerService
          .getCustomerById(customerdetail)
          .then((data) => {
            let filterData = {
              user_id: customerdetail.user_id,
              total_amount: sum,
              shipping_address: data._id,
            };
            orderModel
              .create(filterData)
              .then((orderData) => {
                cartdetails.forEach((cartdetails) => {
                  let detail = {
                    order_id: orderData._id,
                    product_id: cartdetails.product_id._id,
                    quantity: cartdetails.quantity,
                  };
                  orderDetailModel
                    .createOrder(detail)
                    .then((data) => {
                      let isactive = {
                        $set: { isActive: false },
                      };
                      let quantityStock =
                        cartdetails.product_id.quantity - cartdetails.quantity;
                      let updatequantity = {
                        quantity: quantityStock,
                      };
                      cart
                        .updateOne(cartdetails._id, isactive)
                        .then((data) => {
                          admin
                            .updateBook(
                              cartdetails.product_id._id,
                              updatequantity
                            )
                            .then((data) => {
                              resolve(orderData);
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
};
