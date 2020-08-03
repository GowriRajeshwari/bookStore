const Service = require("../services/admin.js");
const adminService = new Service();
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
    response.message = { message: "Invalid Input" };
    response.error = errors;
    res.status(422).send(response);
  } else {
    let filterData = {
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      author: req.body.author,
      genre: req.body.genre,
    };
    adminService
      .addBook(filterData)
      .then((data) => {
        response.success = true;
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
      response.message = "Retrieve Data Successfully";
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.error = err;
      res.status(500).send({ data: response });
    });
};
exports.updateBook = (req, res) => {
  req.checkBody("title", "BookName is invalid").isAlpha().notEmpty() ||
    req.checkBody("description", "description is invalid").notEmpty() ||
    req.checkBody("quantity", "quantity is invalid").notEmpty() ||
    req.checkBody("author", "author is invalid").notEmpty().isAlpha() ||
    req.checkBody("genre", "genre is invalid").notEmpty();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = { message: "Invalid Input" };
    response.error = errors;
    res.status(422).send(response);
  } else {
    adminService
      .updateBook(req.params._id, req.body)
      .then((data) => {
        if (!data) {
          response.success = false;
          response.message = "Note not found with id " + req.params._id;
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
          response.message = "Note not found with id " + req.params._id;
          res.status(404).send({ data: response });
        } else {
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        }
      });
  }
};
exports.deleteBook = (req, res) => {
  var response = {};
  adminService
    .deleteBook(req.params._id)
    .then((data) => {
      if (!data) {
        response.success = false;
        response.message = "Note not found with id " + req.params._id;
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
        response.message = "Note not found with id " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      }
    });
};
