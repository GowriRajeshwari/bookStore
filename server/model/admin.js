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
      console.log("outside promises", req);
      let bookAdd = new bookStoreModel(req);
      return new Promise((reslove, reject) => {
        bookAdd
          .save()
          .then((data) => {
            console.log("inside promise", data);
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
};
