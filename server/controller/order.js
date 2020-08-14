const Service = require("../services/order.js");
const constantsParam = require("../constant/static.js");
const logger = require("../logger/logger.js");
const orderService = new Service();
module.exports.addOrder = (req, res) => {
  try {
    let response = {};
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
  } catch (err) {
    this.errorHandling(err);
  }
};

module.exports.errorHandling = (err) => {
  if (
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError ||
    err instanceof TypeError
  ) {
    logger.error("Programming Error", err);
    logger.error("UserDefined", err);
    res
      .status(
        constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
      )
      .send({ data: response });
  } else {
    logger.error("UserDefined", err);
    res
      .status(
        constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
      )
      .send({ data: response });
  }
};
