const model = require("../modal/userModal.js");
exports.register = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    model.userreg(req, (err, data) => {
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
    model.userLogin(req, (err, data) => {
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
    model.forgotPassword(req, (err, data) => {
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
    model.resetPassword(req, (err, data) => {
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
