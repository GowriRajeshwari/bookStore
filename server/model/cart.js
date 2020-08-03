const mongoose = require("mongoose");

//schema for registration of new user
const cartService = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "register",
    },
    book_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "book",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity cannot be left blank"],
      default: 1,
    },
    isOrdered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

var cartServiceModel = mongoose.model("cart", cartService);
exports.cartServiceModel;

module.exports = class model {
  create(req) {
    try {
      let cartAdd = new cartServiceModel(req);
      return new Promise((resolve, reject) => {
        cartAdd
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
        cartServiceModel
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
};
