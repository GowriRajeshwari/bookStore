const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;

//schema for registration of new user
const registration = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name must be provided"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank"],
    },
    email: {
      type: String,
      required: [true, "Email address cannot be left blank"],
    },
    country: {
      type: String,
      required: [true, "country cannot be left blank"],
    },
    rollField: {
      type: String,
      required: [true, "rollField cannot be left blank"],
    },
  },
  {
    timestamps: true,
  }
);
const registerUser = mongoose.model("register", registration);
exports.registerUser;

module.exports = class Userbookstore {
  find(req, callback) {
    try {
      console.log("find", req.email);
      registerUser.findOne({ email: req.email }, (err, user) => {
        if (err) {
          callback(err);
        } else {
          return callback(null, user);
        }
      });
    } catch (err) {
      return callback("Email Id is not valid check with email is exist or not");
    }
  }
  create(req, callback) {
    try {
      console.log(req);
      var register = registerUser(req);
      register.save((err, data) => {
        if (err) {
          return callback({ message: "Failed to add user", error: err });
        } else {
          return callback(null, data);
        }
      });
    } catch (err) {
      return callback(err);
    }
  }
  updateOne(req, encrypted, callback) {
    registerUser.updateOne(
      {
        _id: req.decoded.data_id,
      },
      encrypted,
      (err, data) => {
        if (err) {
          return callback(err);
        } else {
          console.log("password", ObjectID(req.body._id));
          return callback(null, data);
        }
      }
    );
  }
};
