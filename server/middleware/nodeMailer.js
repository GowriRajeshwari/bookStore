var nodemailer = require("nodemailer");
//sending the mail to client for reset password
exports.sendMailer = (url, email) => {
  console.log("In mailer", process.env.EMAIL, process.env.PASSWORD); //sets the variables from the env file
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  //setup mail configuration
  var mailOptions = {
    from: process.env.EMAIL, //sender email
    to: email, //list of receivers
    subject: "reset password",
    description: "click to reset your password",
    text: url
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
