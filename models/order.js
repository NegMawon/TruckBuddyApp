const mongoose = require("mongoose");
const  Schema = mongoose.Schema;

var OrderSchema = new Schema({
  date: Date,
  cust_id: {type: Schema.Types.ObjectId, ref: "Customer"},
  products: {type: Schema.Types.ObjectId, ref: "Product"}
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
