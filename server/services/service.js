const model = require("../model/model.js");
const { response } = require("express");
let bookstoreModel = new model();
exports.addBook = (req, callback) => {
  try {
    return new Promise((reslove, reject) => {
      bookstoreModel
        .create(req)
        .then((data) => {
          reslove(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    return callback(err);
  }
};
