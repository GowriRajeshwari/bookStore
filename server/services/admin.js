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
                    logger.info("In redis book is stored");
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
                    looger.info("In redis book is stored");
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
    console.log(req.pageNo, req.limit);
    let pageNo = parseInt(req.pageNo);
    let limit = parseInt(req.limit);
    let findQuery = {
      find: {},
    };
    return new Promise((resolve, reject) => {
      const redisKey = "bookStore";
      cache
        .get(redisKey)
        .then((result) => {
          let data = JSON.parse(result);
          if (result) {
            if (req.pageNo === undefined && req.limit === undefined) {
              resolve(data);
            } else {
              this.pagination(data, pageNo, limit)
                .then((data) => {
                  console.log(data);

                  resolve(data);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          } else {
            bookstoreModel
              .find(findQuery)
              .then((data) => {
                if (req.pageNo === undefined && req.limit === undefined) {
                  resolve(data);
                } else {
                  this.pagination(data, pageNo, limit)
                    .then((data) => {
                      resolve(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
                cache
                  .set(redisKey, JSON.stringify(data))
                  .then((data) => {
                    resolve(results);
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
  async pagination(data, pageNo, limit) {
    const startIndex = (pageNo - 1) * limit;
    const endIndex = pageNo * limit;
    const results = {};

    if (endIndex < data.length) {
      results.next = {
        page: pageNo + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: pageNo - 1,
        limit: limit,
      };
    }
    results.data = await data.slice(startIndex, endIndex);
    return results;
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
      var number = /^\d+$/;
      let searchData;
      // console.log(number.test(req));
      // if (number.test(req)) {
      //   searchData = {
      //     $or: [
      //       {
      //         quantity: { $regex: new RegExp(parseInt(req)) },
      //       },
      //       { price: { $regex: new RegExp(parseInt(req)) } },
      //     ],
      //   };
      // } else {
      searchData = {
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
          //   quantity: { $regex: new RegExp("^\\d+$") },
          // },
          // { price: { $regex: new RegExp(req) } },
        ],
      };
      // }

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
