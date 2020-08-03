const Service = require("../services/cart.js");
const cartService = new Service();
const jwt = require("../middleware/jwt.js");
module.exports.addCart = (req, res) => {
  req.checkBody("quantity", "quantity is invalid").notEmpty();
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
        response.message = "Book added Successfully";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      });
  }
};

module.exports.getAllCart = (req, res) => {
  let find = {};
  let response = {};
  let getCarts = {
    find,
  };
  cartService
    .getAllCart(getCarts)
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
