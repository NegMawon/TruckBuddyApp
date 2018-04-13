var db = require('./models');
var faker = require('faker');
var bodyParser = require('body-parser');
var count = process.argv[5] || 5;

// var usersList = [
//   {
//     fullName: faker.name.firstName(),
//     username: faker.username.userName(),
//     password: faker.internet.password()
//   }
//
// ];

var products = [
  {
    prod_brand: 'Microsfot',
    prod_model: 'XBOX One X',
    prod_desc: 'Latest XBox Console',
    prod_price: 599,
    qty: 150
  },

  {
    prod_brand: 'Atari',
    prod_model: 'Atari VCS',
    prod_desc: 'Latest Atari Console',
    prod_price: 399,
    qty: 50
  }

];

var customers = [
  {
    fullName: 'Dilia',
    email: 'td@gmail.com',
    address: '3116 Wolf Pen Road, San Francisco, CA, 94107'
  },
  {
    fullName: 'Taina',
    email: 'ta@gmail.com',
    address: '3138 Wolf Pen Road, San Francisco, CA, 94107'
  }
]

db.Product.remove({}, function(err){
  if(err){
    console.log(err, "something's wrong with removing products")
  }
  console.log("removed all products");
  db.Product.create(products, function(err, success){
    if(err){
      return console.log(err);
    };
    console.log("CREATED Products", success);
  });
});

// db.User.remove({}, function(err){
//   console.log("removed all users!")
//   db.User.create(usersList, function(err, success){
//     if(err){
//       console.log("there was an error!", err)
//       return;
//     }
//     console.log("created a user!", success)
//   })
// console.log("Seed complete");
// });

db.Customer.remove({}, function(err){
  if(err){
    console.log(err, "something's wrong with removing customers")
  }
  console.log("removed all customers");
  db.Customer.create(customers, function(err, success){
    if(err){
      return console.log(err);
    };
    console.log("CREATED Customers", success);
  });
});
