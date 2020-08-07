const Service = require("../services/order.js");
const orderService = new Service();
module.exports.addOrder = (req, res) => {
  req.checkBody("total_amount", "amount is invalid").notEmpty();
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
      total_amount: req.body.total_amount,
    };
    orderService
      .addOrder(filterData)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Order added Successfully";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      });
  }
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
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.error = err;
      res.status(500).send({ data: response });
    });
};
