const model = require("../model/cart.js");
const bookService = require("../services/admin.js");
const adminService = new bookService();
let cartModel = new model();
module.exports = class bookService {
  addCart(req) {
    try {
      return new Promise((resolve, reject) => {
        adminService
          .getBookById(req)
          .then((data) => {
            let result = data.data.quantity;
            if (result >= req.quantity) {
              cartModel
                .create(req)
                .then((data) => {
                  resolve(data);
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject("OUT OF STOCK");
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
  getCart(req) {
    try {
      return new Promise((resolve, reject) => {
        cartModel
          .find(req)
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
  updateCart(_id, req) {
    try {
      return new Promise((resolve, reject) => {
        adminService.getBookById(req).then((data) => {
          console.log(data);
          let result = data.data.quantity;
          console.log(result, req.quantity);
          if (result >= req.quantity) {
            cartModel
              .update(_id, req)
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject("OUT OF STOCK");
          }
        });
      });
    } catch (err) {
      return err;
    }
  }
  deleteCart(_id) {
    return new Promise((resolve, reject) => {
      cartModel
        .delete(_id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
