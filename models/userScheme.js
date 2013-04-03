var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  phone_number: String,
  location: String,
  primary_phone: Boolean,
  sim: Boolean,
  carrier: String,
  date_added: { type: Date, default: Date.now },
  device: {
    imei: { type: String }
  }
});

module.exports = mongoose.model('User', userSchema);
