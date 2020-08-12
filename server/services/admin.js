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
        bookstoreModel.create(filterData).then((data) => {
          cache
            .get(redisKey)
            .then((result) => {
              if (result) {
                const addedData = JSON.parse(result);
                addedData.push(data);
                cache
                  .set(redisKey, JSON.stringify(addedData))
                  .then((data) => {
                    console.log("In redis book is stored");
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                let addedData = [];
                addedData.push(data);
                cache
                  .set(redisKey, JSON.stringify(addedData))
                  .then((data) => {
                    console.log("In redis book is stored");
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }

              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
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
            const data = JSON.parse(result);
            resolve({
              source: "cache",
              data: data,
              message: "Book Get from redis successfully",
            });
          } else {
            bookstoreModel
              .find(findQuery)
              .then((data) => {
                cache
                  .set(redisKey, JSON.stringify(data))
                  .then((data) => {
                    resolve({ source: "api", data: data });
                  })
                  .catch((err) => {
                    reject(err);
                  });
                resolve(data);
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
  searchBook(req) {
    return new Promise((resolve, reject) => {
      let searchData = {
        $or: [
          {
            title: { $regex: new RegExp(req) },
          },
          { description: { $regex: new RegExp(req) } },

          {
            author: { $regex: new RegExp(req) },
          },
          { genre: { $regex: new RegExp(req) } },
          // {
          //   quantity: { $regex: new RegExp(req) },
          // },
          // { price: { $regex: new RegExp(req) } },
        ],
      };
      bookstoreModel
        .search(searchData)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
