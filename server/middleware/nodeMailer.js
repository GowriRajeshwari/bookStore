var nodemailer = require("nodemailer");
const logger = require("../logger/logger.js");
//sending the mail to client for reset password
exports.sendMailer = (url, email, res) => {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  //setup mail configuration
  var mailOptions = {
    from: process.env.EMAIL, //sender email
    to: email, //list of receivers
    subject: "reset password",
    description: "click to reset your password",
    text: url,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(404).send({
        error: err,
      });
    } else {
      logger.log("info", "Email sent: " + info.response);
    }
  });
};
