const mongoose = require("mongoose");
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: [true, "role cannot be left blank"],
    },
  },
  {
    timestamps: true,
  }
);
const registerUser = mongoose.model("register", registration);
exports.registerUser;

module.exports = class userService {
  find(req, callback) {
    registerUser.findOne(req, (err, data) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, data);
      }
    });
  }
  create(req, callback) {
    try {
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
          return callback(null, data);
        }
      }
    );
  }
};
