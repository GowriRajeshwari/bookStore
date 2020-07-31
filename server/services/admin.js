const model = require("../model/admin.js");
const { response } = require("express");
let bookstoreModel = new model();
exports.addBook = (req) => {
  return new Promise((reslove, reject) => {
    bookstoreModel
      .create({
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        author: req.body.author,
        genre: req.body.genre,
      })
      .then((data) => {
        reslove(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.getAllBook = (req) => {
  let findQuery = {
    find: req.find,
  };
  return new Promise((reslove, reject) => {
    bookstoreModel
      .find(findQuery)
      .then((data) => {
        reslove(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.updateBook = (_id, req) => {
  return new Promise((reslove, reject) => {
    bookstoreModel
      .findbyIdandUpdate(_id, req)
      .then((data) => {
        reslove(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
