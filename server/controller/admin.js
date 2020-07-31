const adminService = require("../services/admin.js");
exports.addBook = (req, res) => {
  req
    .checkBody("title", "BookName is invalid")
    .len({ min: 3 })
    .isAlpha()
    .notEmpty();
  req.checkBody("description", "description is invalid").notEmpty();
  req.checkBody("quantity", "quantity is invalid").notEmpty();
  req.checkBody("author", "author is invalid").notEmpty().isAlpha();
  req.checkBody("genre", "genre is invalid").notEmpty();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    let data = { message: "Invalid Input" };
    response.data = data;
    res.status(422).send(response);
  } else {
    console.log(req.body);
    adminService
      .addBook(req)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Book added Successfully";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(404).send({ data: response });
      });
  }
};
exports.getAllBook = (req, res) => {
  let find = {};
  let response = {};
  let getBooks = {
    find,
  };
  adminService
    .getAllBook(getBooks)
    .then((data) => {
      response.success = true;
      response.data = data;
      console.log(response);
      response.message = "Retrieve Data Successfully";
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res.status(500).send({ data: response });
    });
};
exports.updateBook = (req, res) => {
  req
    .checkBody("title", "BookName is invalid")
    .len({ min: 3 })
    .isAlpha()
    .notEmpty();
  req.checkBody("description", "description is invalid").notEmpty();
  req.checkBody("quantity", "quantity is invalid").notEmpty();
  req.checkBody("author", "author is invalid").notEmpty().isAlpha();
  req.checkBody("genre", "genre is invalid").notEmpty();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    let data = { message: "Invalid Input" };
    response.data = data;
    res.status(422).send(response);
  } else {
    adminService
      .updateBook(req.params._id, req.body)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Book Update Successfully";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(404).send({ data: response });
      });
  }
};
