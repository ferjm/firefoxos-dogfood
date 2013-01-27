var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  company: String,
  phone_number: String,
  location: String,
  primary_phone: Boolean,
  sim: Boolean,
  carrier: String,
  date_added: { type: Date, default: Date.now },
  device: {
    imei: String,
    date_added: { type: Date, default: Date.now },
    updates: [{
      ip: String,
      channel: String,
      from_build_id: String,
      to_build_id: String,
      from_version: String,
      date_added: { type: Date, default: Date.now }
      // Figure out the information provided in each update.
    }],
    comments: [{
      contact: String,
      build_id: String,
      comment: String,
      date_added: { type: Date, default: Date.now }
    }]
  }
});

/**
 * aCb has the form aCb(error, result);
 * where error is not null when something unexpected happens
 * and result is the data returned by the DB.
 */
userSchema.methods.getComments = function(aCb) {
  return this.model('User').find({
    comments: this.device.comments
  }, aCb);
};

userSchema.methods.getDevice = function(aCb) {
  return this.model('User').find({
    device: this.device
  }, aCb);
};

userSchema.methods.getUpdates = function(aCb) {
  return this.model('User').find({
    updates: this.device.updates
  }, aCb);
};

module.exports = mongoose.model('User', userSchema);
