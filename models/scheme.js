var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    company: String,
    phone_number: String,
    location: String,
    primary_phone: Boolean,
    sim: String,
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
  }
);

module.exports = mongoose.model('User', userSchema);