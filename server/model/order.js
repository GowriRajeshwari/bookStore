const mongoose = require("mongoose");

//schema for registration of new user
const orders = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "register",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    shipping_address: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const orderDetail = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "register",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "book",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

var orderDetialModel = mongoose.model("orderDetial", orderDetail);
var odersModel = mongoose.model("oders", orders);
exports.orderDetialModel;
exports.odersModel;

module.exports = class model {
  create(req) {
    let orders = new odersModel(req);
    return orders.save();
  }
  createOrder(req) {
    let orderDetail = new orderDetialModel(req);
    return orderDetail.save();
  }
  find(req) {
    return orderDetialModel.find(req).populate("shipping_address");
  }
  findOrder(req) {
    return orderDetialModel.find(req).populate("product_id", "title price");
  }
};
