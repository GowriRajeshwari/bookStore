const Service = require("../services/orderDetails");
const constantsParam = require("../constant/static.js");
const logger = require("../logger/logger.js");
const orderService = new Service();

module.exports.getOrder = (req, res) => {
  try {
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
  } else {
    logger.error("UserDefined", err);
    result.message = err.message.toString();
  }
};
