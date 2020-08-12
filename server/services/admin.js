const model = require("../model/admin.js");
const { response } = require("express");
const cache = require("../services/cache.js");
let bookstoreModel = new model();

module.exports = class bookService {
  addBook(req) {
    try {
      return new Promise((resolve, reject) => {
        const redisKey = "bookStore";
        let filterData = {
          title: req.title,
          description: req.description,
          quantity: req.quantity,
          author: req.author,
          genre: req.genre,
          price: req.price,
        };
        bookstoreModel
          .create(filterData)
          .then((data) => {
            cache
              .append(redisKey, JSON.stringify(data))
              .then((data) => {
                console.log("In redis book is stored");
              })
              .catch((err) => {
                reject(err);
              });
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
  getAllBook(req) {
    let findQuery = {
      find: req.find,
    };
    return new Promise((resolve, reject) => {
      const redisKey = "bookStore";
      cache
        .get(redisKey)
        .then((result) => {
          if (result) {
            resolve({
              source: "cache",
              data: result,
              message: "Book Get from redis successfully",
            });
          } else {
            bookstoreModel
              .find(findQuery)
              .then((data) => {
                // resolve(data);
                cache
                  .set(redisKey, JSON.stringify(data))
                  .then((data) => {
                    resolve({ source: "api", data: data });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getBookById(req) {
    let id = {
      _id: req.product_id,
    };
    return new Promise((resolve, reject) => {
      bookstoreModel
        .findbyId(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateBook(_id, req) {
    console.log(_id, req);
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
  }
  deleteBook(_id) {
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
  }
};
