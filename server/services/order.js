const model = require("../model/order.js");
const customerService = require("../services/customerDetail.js");
const cartService = require("../services/cart.js");
const AdminService = require("../services/admin.js");
const cart = new cartService();
const admin = new AdminService();
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
            if (data1.length > 0) {
              let cartdetails = data1.filter((data1) => {
                if (data1.isActive === true) {
                  sum = sum + data1.quantity * data1.product_id.price;
                  return data1;
                } else {
                  reject({ message: "No Cart is avaliable" });
                }
              });
              this.addOrderDetail(customerdetail, cartdetails, sum)
                .then((data) => {
                  resolve(data);
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject({ message: "No Cart is avaliable" });
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
              .then((data1) => {
                cartdetails.forEach((cartdetails) => {
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
                this.update(cartdetails)
                  .then((data) => {
                    resolve(data1);
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
  update(cartdetails) {
    try {
      return new Promise((resolve, reject) => {
        let cart = cartdetails;
        cart.forEach((cart) => {
          let isactive = {
            isActive: false,
          };
          let quantityStock = cart.product_id.quantity - cart.quantity;
          let updatequantity = {
            quantity: quantityStock,
          };
          // cart
          //   .update(cart._id, isactive)
          //   .then((data) => {
          //     // resolve(data);
          //     console.log(
          //       cart.product_id._id,
          //       updatequantity,
          //       cart.product_id.quantity,
          //       cart.quantity
          //     );
          // admin
          //   .updateBook(cart.product_id._id, updatequantity)
          //   .then((data) => {
          //     resolve(data);
          //   })
          //   .catch((err) => {
          //     reject(err);
          //   });
          // })
          // .catch((err) => {
          //   reject(err);
          // });
        });
      });
    } catch (err) {
      return err;
    }
  }
};
