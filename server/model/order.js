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
      // type: mongoose.Types.ObjectId,
      // required: true,
      // ref: "cart",
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
const oderDetial = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "register",
    },
    cartDetails: [
      {
        // type: mongoose.Types.ObjectId,
        // required: true,
        // ref: "cart",
        // product_id: {
        //   type: mongoose.Types.ObjectId,
        //   required: true,
        //   ref: "book",
        // },
        // quantity: {
        //   type: mongoose.Types.ObjectId,
        //   required: true,
        //   ref: "cart",
        // },
      },
    ],
  },
  {
    timestamps: true,
  }
);

var orderDetialModel = mongoose.model("oderDetial", oderDetial);
var odersModel = mongoose.model("oders", orders);
exports.orderDetialModel;
exports.odersModel;

module.exports = class model {
  create(req, cartArray) {
    let orders = new odersModel(req);
    // let product_id = cartArray.map(({ product_id }) => product_id._id);
    // let quantity = cartArray.map(({ quantity }) => quantity);
    return new Promise((resolve, reject) => {
      orders
        .save()
        .then((data) => {
          let detail = {
            order_id: data._id,
            cartDetails:
              //  [
              //   {
              //     product_id: product_id,
              //     // quantity: quantity,
              //   },
              // ],
              cartArray,
          };
          let orderDetail = new orderDetialModel(detail);
          orderDetail.save();
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  find(req) {
    return orderDetialModel.find(req).populate("shipping_address");
  }
  findOrder(req) {
    return orderDetialModel.find(req);
  }
};
