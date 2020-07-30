const mongoose = require("mongoose");

//schema for registration of new user
const bookStore = mongoose.Schema(
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

var bookStoreModel = mongoose.model("register", bookStore);
exports.bookStoreModel;

modeule.exports = class model {
  create(req, callback) {
    try {
      return new Promise((reslove, reject) => {
        let bookAdd = new bookStoreModel(req);
        bookAdd
          .save()
          .then((result) => {
            reslove({ data: result });
          })
          .catch((err) => {
            reject({ error: err });
          });
      });
    } catch (err) {
      return callback(err);
    }
  }
};
