const mongoose = require("mongoose");

//schema for registration of new user
const customerDetails = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be provided"],
    },
    pincode: {
      type: Number,
      required: [true, "Quantity cannot be left blank"],
    },
    city: {
      type: String,
      required: [true, "City must be provided"],
    },
    phone_number: {
      type: Number,
      required: [true, "phone number cannot be left blank"],
    },
    landmark: {
      type: String,
      required: [true, "Landmark must be provided"],
    },
    state: {
      type: String,
      required: [true, "state must be provided"],
    },
    address: {
      type: String,
      required: [true, "Address must be provided"],
    },
    address_type: {
      type: String,
      enum: ["home", "other"],
      default: "home",
      required: [true, "Address_type cannot be left blank"],
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "cart",
    },
  },
  {
    timestamps: true,
  }
);

var customerDetailsModel = mongoose.model("customer", customerDetails);
exports.customerDetailsModel;

module.exports = class model {
  create(req) {
    let cartAdd = new customerDetailsModel(req);
    return cartAdd.save();
  }
  find(req) {
    return customerDetailsModel.find(req).populate("cart_id");
  }
};
