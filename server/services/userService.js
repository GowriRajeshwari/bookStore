const model = require("../modal/userModal.js");
var bookstoreModel = new model();
exports.register = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    bookstoreModel.userreg(req, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.parse(JSON.stringify(data)));
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//login the user
exports.loginUser = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    bookstoreModel.userLogin(req, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.parse(JSON.stringify(data)));
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//forgotPassword
exports.forgotPassword = (req, callback) => {
  try {
    console.log(" In service forgotpassword :", req.body);
    bookstoreModel.forgotPassword(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//ResetPassword
exports.resetPassword = (req, callback) => {
  try {
    console.log(" In service forgotpassword :", req.body);
    bookstoreModel.resetPassword(req, (err, data) => {
      if (err) {
        //if error callback function is called and passing the error
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
