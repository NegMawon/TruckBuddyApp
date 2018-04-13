var db = require('./models');
db.User.remove({}, function(err, users){
  if (err) {
     console.log(err);
     return;
   }
   console.log("Removed Users");
})
db.Customer.remove({}, function(err, customers){
  if (err) {
     console.log(err);
     return;
   }
   console.log("Removed Customers");
})
db.Product.remove({}, function(err, products){
  if (err) {
     console.log(err);
     return;
   }
   console.log("Removed Products");
})
// db.Orders.remove({}, function(err, orders){
//   if (err) {
//      console.log(err);
//      return;
//    }
//    console.log("Removed Orders");
// })
