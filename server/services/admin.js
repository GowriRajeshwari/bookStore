const model = require("../model/admin.js");
const { response } = require("express");
let bookstoreModel = new model();
exports.addBook = (req) => {
  try {
    return new Promise((resolve, reject) => {
      let filterData = {
        title: req.title,
        description: req.description,
        quantity: req.quantity,
        author: req.author,
        genre: req.genre,
      };
      bookstoreModel
        .create(filterData)
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
};
exports.getAllBook = (req) => {
  let findQuery = {
    find: req.find,
  };
  return new Promise((resolve, reject) => {
    bookstoreModel
      .find(findQuery)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.updateBook = (_id, req) => {
  return new Promise((resolve, reject) => {
    bookstoreModel
      .update(_id, req)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.deleteBook = (_id) => {
  return new Promise((resolve, reject) => {
    bookstoreModel
      .delete(_id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
