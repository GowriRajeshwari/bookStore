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
