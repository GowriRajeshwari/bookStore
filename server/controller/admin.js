const Service = require("../services/admin.js");
const constantsParam = require("../constant/static.js");
const logger = require("../logger/logger.js");
const adminService = new Service();
module.exports.addBook = (req, res) => {
  try {
    console.log(req.body);
    let imageUrl = req.file.location;
    req
      .checkBody("title", "BookName is invalid")
      .len({ min: 3 })
      .isAlpha()
      .notEmpty();
    req.checkBody("description", "description is invalid").notEmpty();
    req.checkBody("quantity", "quantity is invalid").notEmpty().isNumeric();
    req.checkBody("author", "author is invalid").notEmpty().isAlpha();
    req.checkBody("genre", "genre is invalid").notEmpty();
    req.checkBody("price", "price is invalid").notEmpty().isNumeric();

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
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        imageUrl: imageUrl,
      };
      adminService
        .addBook(filterData)
        .then((data) => {
          response.success = true;
          response.message = "Book added Successfully";
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
              constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                .errorResponseCode
            )
            .send({ data: response });
        });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.getAllBook = (req, res) => {
  try {
    let find = {};
    let response = {};
    let getBooks = {
      pageNo: req.query.page,
      limit: req.query.limit,
    };
    adminService
      .getAllBook(getBooks)
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
module.exports.updateBook = (req, res) => {
  try {
    req.checkBody("title", "BookName is invalid").isAlpha().notEmpty() ||
      req.checkBody("description", "description is invalid").notEmpty() ||
      req.checkBody("quantity", "quantity is invalid").notEmpty() ||
      req.checkBody("author", "author is invalid").notEmpty().isAlpha() ||
      req.checkBody("genre", "genre is invalid").notEmpty() ||
      req.checkBody("price", "price is invalid").notEmpty().isNumeric();

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
      adminService
        .updateBook(req.params._id, req.body)
        .then((data) => {
          if (!data) {
            response.success = false;
            response.message = "Book not found ";
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
            response.message = "Book not found ";
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
module.exports.deleteBook = (req, res) => {
  try {
    var response = {};
    adminService
      .deleteBook(req.params._id)
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
module.exports.searchBook = (req, res) => {
  try {
    var response = {};
    adminService
      .searchBook(req.params.query)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "search Data Successfully";
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
