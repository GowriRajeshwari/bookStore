const Service = require("../services/cart.js");
const constantsParam = require("../constant/static.js");
const logger = require("../logger/logger.js");
const cartService = new Service();
const jwt = require("../middleware/jwt.js");
module.exports.addCart = (req, res) => {
  try {
    req.checkBody("quantity", "quantity is invalid").notEmpty().isNumeric();
    var response = {};
    const errors = req.validationErrors();
    if (errors) {
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
        product_id: req.params._id,
        quantity: req.body.quantity,
      };
      cartService
        .addCart(filterData)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Cart added Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            response.success = false;
            response.message = "Book not found with id " + req.params._id;
            res
              .status(
                constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                  .errorResponseCode
              )
              .send({ data: response });
          } else {
            response.success = false;
            response.message = err;
            res
              .status(
                constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                  .errorResponseCode
              )
              .send({ data: response });
          }
        });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};

module.exports.getCart = (req, res) => {
  try {
    let response = {};
    let find = {
      user_id: req.decoded.data_id,
    };
    cartService
      .getCart(find)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Retrieve Data Successfully";
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
module.exports.updateCart = (req, res) => {
  try {
    req.checkBody("quantity", "quantity is invalid").notEmpty().isNumeric();
    var response = {};
    const errors = req.validationErrors();
    if (errors) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send(response);
    } else {
      cartService
        .updateCart(req.params._id, req.body)
        .then((data) => {
          if (!data) {
            response.success = false;
            response.message = "Book not found with id " + req.params._id;
            res
              .status(
                constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                  .errorResponseCode
              )
              .send({ data: response });
          } else {
            response.success = true;
            response.message = "Book Update Successfully";
            res
              .status(
                constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                  .OK.successResponseCode
              )
              .send({ data: response });
          }
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            response.success = false;
            response.message = "Book not found with id " + req.params._id;
            res
              .status(
                constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                  .errorResponseCode
              )
              .send({ data: response });
          } else {
            response.success = false;
            response.message = err;
            res
              .status(
                constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                  .errorResponseCode
              )
              .send({ data: response });
          }
        });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.deleteCart = (req, res) => {
  try {
    var response = {};
    cartService
      .deleteCart(req.params._id)
      .then((data) => {
        if (!data) {
          response.success = false;
          response.message = "Book not found with id " + req.params._id;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                .errorResponseCode
            )
            .send({ data: response });
        } else {
          response.success = true;
          response.data = data;
          response.message = "Delete Data Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        }
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          response.success = false;
          response.message = "Book not found with id " + req.params._id;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.BAD_REQUEST
                .errorResponseCode
            )
            .send({ data: response });
        } else {
          response.success = false;
          response.message = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                .errorResponseCode
            )
            .send({ data: response });
        }
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
    response.success = false;
    response.message = err.message.toString();
    res
      .status(
        constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
      )
      .send({ data: response });
  }
};
