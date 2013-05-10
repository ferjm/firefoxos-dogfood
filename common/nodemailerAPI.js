var nodemailer = require("nodemailer");

exports.send = function(email){
	var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "feddback01@gmail.com",
        pass: "feedback"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Equipo QA <feedback01@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Texto del asunto", // Subject line
    text: "Texto fijo para el usuario", // plaintext body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});

};