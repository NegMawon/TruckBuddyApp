var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  prod_brand: String,
  prod_model: String,
  prod_desc: String,
  prod_price: Number,
  weight: String,
  qty: Number,
});

module.exports = mongoose.model('Product', ProductSchema);
