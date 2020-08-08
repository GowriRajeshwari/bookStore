const Service = require("../services/order.js");
const constantsParam = require("../constant/static.js");
const orderService = new Service();
module.exports.addOrder = (req, res) => {
  let filterData = {
    user_id: req.decoded.data_id,
  };
  orderService
    .addOrder(filterData)
    .then((data) => {
      response.success = true;
      response.data = data;
      response.message = "Order added Successfully";
      res
        .status(
          constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages.OK
            .successResponseCode
        )
        .send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
            .errorResponseCode
        )
        .send({ data: response });
    });
};
module.exports.getOrder = (req, res) => {
  let response = {};
  let find = {
    order_id: req.params._id,
  };
  orderService
    .getOrder(find)
    .then((data) => {
      response.success = true;
      response.data = data;
      response.message = "Retrieve order data Successfully";
      res
        .status(
          constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages.OK
            .successResponseCode
        )
        .send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.error = err;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
            .errorResponseCode
        )
        .send({ data: response });
    });
};
