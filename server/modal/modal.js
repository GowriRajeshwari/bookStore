const mongoose = require("mongoose");
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

  userLogin(req, callback) {
    try {
      var response = {};
      registerUser.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
          console.log("password", req.body.password);
          bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
            console.log(encrypted);
            if (err) {
              console.log("err find it out");
              callback("Password is Incorrect");
            } else if (encrypted) {
              response._id = user._id;
              response.fullName = user.fullName;
              response.email = req.body.email;
              // const token = jwt.sign({ _id: user._id }, process.env.KEY);
              // response.tokens = user.tokens.concat({ token });
              callback(null, response);
            } else {
              callback("Password is Incorrect");
            }
          });
        } else {
          callback("User Not Found");
          console.log("User Not Found");
        }
      });
    } catch (err) {
      console.log("err in userlogin", err);
    }
  }
};
