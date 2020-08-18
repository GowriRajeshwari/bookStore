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
    price: {
      type: Number,
      required: [true, "price cannot be left blank"],
    },
    imageUrl: {
      type: String,
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
    let bookAdd = new bookStoreModel(req);
    return bookAdd.save();
  }
  find(req) {
    return bookStoreModel.find(req.find);
  }
  findbyId(req) {
    return bookStoreModel.findById(req);
  }
  update(_id, req) {
    return bookStoreModel.findByIdAndUpdate(_id, req, {
      useFindAndModify: false,
    });
  }
  delete(_id) {
    return bookStoreModel.findByIdAndRemove(_id, { useFindAndModify: false });
  }
  search(req) {
    return bookStoreModel.find(req, { _id: 0, __v: 0 });
  }
};
