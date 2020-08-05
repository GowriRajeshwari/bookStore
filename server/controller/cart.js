const Service = require("../services/cart.js");
const cartService = new Service();
const jwt = require("../middleware/jwt.js");
module.exports.addCart = (req, res) => {
  req.checkBody("quantity", "quantity is invalid").notEmpty().isNumeric();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = { message: "Invalid Input" };
    response.error = errors;
    res.status(422).send(response);
  } else {
    let filterData = {
      user_id: req.decoded.data_id,
      book_id: req.params._id,
      quantity: req.body.quantity,
    };
    cartService
      .addCart(filterData)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Cart added Successfully";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          response.success = false;
          response.message = "Book not found with id " + req.params._id;
          res.status(404).send({ data: response });
        } else {
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        }
      });
  }
};

module.exports.getCart = (req, res) => {
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
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.error = err;
      res.status(500).send({ data: response });
    });
};
module.exports.updateCart = (req, res) => {
  req.checkBody("quantity", "quantity is invalid").notEmpty().isNumeric();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = { message: "Invalid Input" };
    response.error = errors;
    res.status(422).send(response);
  } else {
    cartService
      .updateCart(req.params._id, req.body)
      .then((data) => {
        if (!data) {
          response.success = false;
          response.message = "Book not found with id " + req.params._id;
          res.status(404).send({ data: response });
        } else {
          response.success = true;
          response.message = "Book Update Successfully";
          res.status(200).send({ data: response });
        }
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          response.success = false;
          response.message = "Book not found with id " + req.params._id;
          res.status(404).send({ data: response });
        } else {
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        }
      });
  }
};
module.exports.deleteCart = (req, res) => {
  var response = {};
  cartService
    .deleteCart(req.params._id)
    .then((data) => {
      if (!data) {
        response.success = false;
        response.message = "Book not found with id " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        response.message = "Delete Data Successfully";
        res.status(200).send({ data: response });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        response.success = false;
        response.message = "Book not found with id " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      }
    });
};
