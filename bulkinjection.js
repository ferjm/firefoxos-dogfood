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
  for (var i = 1, end = data.length; i < end; i++) {
    if (!data[i][5] || !data[i][5].length) {
      continue;
    }
    var name = data[i][3].replace(/^\s+|\s+$/g, "");    
    var user = {
      first_name: name.slice(name.indexOf(',') + 2),
      last_name: name.slice(0, name.indexOf(',')),
      email: data[i][5],
      sim: (data[i][6] === 'freesim') || (data[i][6] === 'hacer DUPLO'),
      location: data[i][4],
      device: { imei: '' }
    };
    apiUser.newUser(user, function(error, result) {
      if (error) {
        console.log('God damn it! ' + error);
        return;
      }
      console.log("Stored " + JSON.stringify(user));
    });
  }

  console.log("Chicken ready!");
});
