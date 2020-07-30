const model = require("../model/model.js");

exports.addBook = (req, callback) => {
  try {
    return model
      .create(req)
      .then((data) => {
        return callback(null, data);
      })
      .catch((err) => {
        return callback(err);
      });
  } catch (err) {
    return callback(err);
  }
};
