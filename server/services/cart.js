const model = require("../model/admin.js");
const { response } = require("express");
let bookstoreModel = new model();
module.exports = class bookService {
  addCart(req) {
    try {
      return new Promise((resolve, reject) => {
        bookstoreModel
          .create(req)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch {
      return err;
    }
  }
  getAllCart(req) {
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
  }
};
