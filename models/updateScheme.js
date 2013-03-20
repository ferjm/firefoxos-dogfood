var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var updateSchema = new Schema({
  imei: String,
  user: String,
  channel: String,
  from_build_id: String,
  to_build_id: String,
  from_version: String,
  to_version: String,
  date_added: { type: Date, default: Date.now }
  // Figure out the information provided in each update.
});

module.exports = mongoose.model('Update', updateSchema);
