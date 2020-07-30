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
        console.log("inside service", data);
        reslove(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
