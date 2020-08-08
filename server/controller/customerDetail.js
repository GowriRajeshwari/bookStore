const customerServices = require("../services/customerDetail.js");
const constantsParam = require("../constant/static.js");
module.exports.addAddress = (req, res) => {
  let response = {};
  try {
    req.checkBody("name", "name should not be empty").notEmpty();
    req
      .checkBody("pincode", "pincode should not be empty")
      .notEmpty()
      .isNumeric();
    req
      .checkBody("phone_number", "phoneNumber should not be empty")
      .notEmpty()
      .isNumeric();
    req.checkBody("city", "city should not be empty").notEmpty();
    req.checkBody("landmark", "landmark should not be empty").notEmpty();
    req.checkBody("state", "state should not be empty").notEmpty();
    req.checkBody("address", "address should not be empty").notEmpty();
    req
      .checkBody("address_type", "address type should not be empty")
      .notEmpty()
      .isAlpha();
    let error = req.validationErrors();
    if (error) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send(response);
    } else {
      let filterData = {
        user_id: req.decoded.data_id,
        name: req.body.name,
        city: req.body.city,
        pincode: req.body.pincode,
        phone_number: req.body.phone_number,
        state: req.body.state,
        landmark: req.body.landmark,
        address: req.body.address,
        address_type: req.body.address_type,
      };

      customerServices
        .addAddress(filterData)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Address added Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                .errorResponseCode
            )
            .send({ data: response });
        });
    }
  } catch (err) {
    response.status = false;
    response.error = err;
    return res
      .status(
        constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
      )
      .send(response);
  }
};
