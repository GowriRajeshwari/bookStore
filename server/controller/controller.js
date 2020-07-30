const userService = require("../services/service.js");
exports.addBook = (req, res) => {
  console.log(req.body);
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
    res.status(500).send(response);
    console.log("Book not added", errors);
  } else {
    console.log(req.body);
    return new Promise((reslove, reject) => {
      userService
        .addBook(req)
        .then((data) => {
          // reslove(data);
          response.success = true;
          response.data = data;
          console.log(response);
          response.message = "Book added  Successfully";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        });
    });
  }
};
