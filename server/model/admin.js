const mongoose = require("mongoose");

//schema for registration of new user
const bookService = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
    },
    description: {
      type: String,
      required: [true, "Description cannot be left blank"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity cannot be left blank"],
    },
    author: {
      type: String,
      required: [true, "Author cannot be left blank"],
    },
    genre: {
      type: String,
      required: [true, "Genre cannot be left blank"],
    },
  },
  {
    timestamps: true,
  }
);

var bookStoreModel = mongoose.model("book", bookService);
exports.bookStoreModel;

module.exports = class model {
  create(req) {
    try {
      let bookAdd = new bookStoreModel(req);
      return new Promise((resolve, reject) => {
        bookAdd
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      return err;
    }
  }
  find(req) {
    try {
      return new Promise((resolve, reject) => {
        bookStoreModel
          .find(req.find)
          .then((data) => {
            if (data.length == 0) {
              resolve({ message: "Book Not found", data: data });
            } else {
              resolve({ message: "Book found", data: data });
            }
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      return err;
    }
  }
  findbyId(req) {
    try {
      return new Promise((resolve, reject) => {
        bookStoreModel
          .findById(req)
          .then((data) => {
            if (!data) {
              resolve({ message: "Book Not found", data: data });
            } else {
              resolve({ message: "Book found", data: data });
            }
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      return err;
    }
  }
  update(_id, req) {
    try {
      return new Promise((resolve, reject) => {
        bookStoreModel
          .findByIdAndUpdate(_id, req, { useFindAndModify: false })
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
  delete(_id) {
    try {
      return new Promise((resolve, reject) => {
        bookStoreModel
          .findByIdAndRemove(_id, { useFindAndModify: false })
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
