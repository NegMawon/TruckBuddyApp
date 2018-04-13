var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TruckBuddyData");

module.exports.Product = require("./product");
module.exports.User = require("./user");
module.exports.Order = require("./order");
module.exports.Customer = require("./customer");
