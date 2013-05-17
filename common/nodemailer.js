var nodemailer = require("nodemailer"),
    config = require('../config.js');

var smtpTransport = nodemailer.createTransport("SMTP", {
  host: config.mailHost,
  secureConnection: config.mailSecureConnection,
  port: config.mailPort,
  auth: {
    user: config.mailSenderUser,
    pass: config.mailSenderPassword
  }
});

exports.send = function(email) {

  if (!email) {
    return;
  }

  var mailOptions = {
    from: config.mailSenderFrom, 
    to: email, 
    subject: config.mailSenderSubject, 
    text: config.mailSenderText 
  }

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else if (response && response.message) {
      console.log('Message sent: ' + response.message);
    }
  });
};