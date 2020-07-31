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
      return new Promise((reslove, reject) => {
        bookAdd
          .save()
          .then((data) => {
            reslove(data);
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      console.log(err);
    }
  }
  find(req) {
    try {
      let bookAdd = new bookStoreModel(req);
      return new Promise((reslove, reject) => {
        bookStoreModel
          .find(req.find)
          .then((data) => {
            if (data.length == 0) {
              reslove({ message: "Book Not found", data: data });
            }
            reslove({ message: "Book found", data: data });
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      console.log(err);
    }
  }
};
