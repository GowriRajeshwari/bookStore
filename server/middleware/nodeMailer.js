var nodemailer = require("nodemailer");
//sending the mail to client for reset password
module.exports.sendMailer = (url, email) => {
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
      return err;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
