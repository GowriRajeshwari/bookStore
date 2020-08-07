const mongoose = require("mongoose");

//schema for registration of new user
const cartService = mongoose.Schema(
  {
    user_id: {
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
      required: [true, "Quantity cannot be left blank"],
      default: 1,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
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
    let cartAdd = new cartServiceModel(req);
    return cartAdd.save();
  }
  find(req) {
    return cartServiceModel
      .find(req)
      .populate("product_id", "title price quantity");
  }
  update(_id, req) {
    return cartServiceModel.findByIdAndUpdate(_id, req, {
      useFindAndModify: false,
    });
  }
  delete(_id) {
    return cartServiceModel.findByIdAndRemove(_id, { useFindAndModify: false });
  }
  // sum(req) {
  //   console.log(req);
  //   let id = mongoose.Types.ObjectId(req);
  //   return cartServiceModel.aggregate([
  //     {
  //       $match: {
  //         user_id: id,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: id,
  //         price: {
  //           $sum: {
  //             $multiply: ["$price", "$quantity"],
  //           },
  //         },
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "book",
  //         localField: "product_id",
  //         foreignField: "_id",
  //         as: "price",
  //       },
  //     },
  //     // {
  //     //   $unwind: "$price",
  //     // },
  //     // {
  //     //   $project: {
  //     //     id: "$_id",
  //     //     sum: "$price",
  //     //   },
  //     // },
  //   ]);
  // }
};
