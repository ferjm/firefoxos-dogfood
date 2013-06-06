//This script allows to import to the database a list of users from a file.xls
//The file.xls must have three columns: first name, last name and email.
var config = require('./config.js'),
    mongoose = require('mongoose'),
    parseXlsx = require('excel'),
    apiUser = require('./models/apiUser.js');

// Check script arguments.
if (process.argv.length < 3) {
  console.log("You are doing it wrong!\nUsage:\n\t" +
              "node bulkinjection.js <xlsl file>");
  process.exit(0);
}

console.log('\nFirefox OS dogfood bulk injection');
console.log('=================================');

// Connect to dogfooding DB.
mongoose.connect('mongodb://' + config.host + '/' + config.ddbbName);

// Parse XLSL file.
parseXlsx(process.argv[2], function(error, data) {
  if (error) {
    console.log(error);
    return;
  }

  // The first record is the name of the fields, so we ignore it.
  for (var i = 1, end = data.length; i < end; i++){
    var user = {
      first_name: data[i][0].replace(/^\s+|\s+$/g, ""),
      last_name: data[i][1].replace(/^\s+|\s+$/g, ""),
      email: data[i][2].replace(/^\s+|\s+$/g, "")
    };

    apiUser.newUser(user, function(error, result) {
      if (error) {
        console.log('God damn it! ' + error);
        return;
      }
      console.log("Stored " + JSON.stringify(user));
    });
  }

  console.log("Chicken ready! " + i + " users imported");
});