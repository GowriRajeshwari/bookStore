const model = require("../model/customerDetail.js");
let customerDetailModel = new model();
module.exports.addAddress = (req) => {
  try {
    return new Promise((resolve, reject) => {
      customerDetailModel
        .create(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    return err;
  }
};
