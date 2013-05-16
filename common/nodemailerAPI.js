var nodemailer = require("nodemailer");
var config = require('../config.js');

exports.send = function(email) {
var smtpTransport = nodemailer.createTransport("SMTP", {
    host: config.mailHost,
    secureConnection: config.mailSecureConnection,
    port: config.mailPort,
    auth: {
        user: config.mailSenderUser,
        pass: config.mailSenderPassword
    }
});

var mailOptions = {
  from: config.mailSenderFrom, 
  to: email, 
  subject: config.mailSenderSubject, 
  text: config.mailSenderText, 
}

smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
});
};