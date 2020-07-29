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
