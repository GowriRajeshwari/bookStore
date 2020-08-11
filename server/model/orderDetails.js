const mongoose = require("mongoose");

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
exports.orderDetialModel;

module.exports = class model {
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
