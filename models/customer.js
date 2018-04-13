const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  fullName: String,
  email: String,
  address: String,
});

module.exports = mongoose.model('Customer', CustomerSchema);
