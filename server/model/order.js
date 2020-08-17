const mongoose = require("mongoose");

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
var ordersModel = mongoose.model("orders", orders);
exports.ordersModel;

module.exports = class model {
  create(req) {
    let orders = new ordersModel(req);
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
