const model = require("../model/cart.js");
const bookController = require("../services/admin.js");
const adminService = new bookController();
const { response } = require("express");
let bookstoreModel = new model();
module.exports = class bookService {
  addCart(req) {
    try {
      return new Promise((resolve, reject) => {
        adminService
          .getBookById(req)
          .then((data) => {
            let result = data.data.quantity;
            if (result >= req.quantity) {
              bookstoreModel
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
  getAllCart(req) {
    try {
      return new Promise((resolve, reject) => {
        bookstoreModel
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
  getCartById(req) {
    try {
      return new Promise((resolve, reject) => {
        bookstoreModel
          .findbyId(req)
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
