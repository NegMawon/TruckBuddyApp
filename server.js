const express = require("express");
const  app = express();
const  bodyParser = require("body-parser");
const  methodOverride = require("method-override");
const env = require('dotenv').config();
const  $ = require("jquery");
const  cookieParser = require("cookie-parser");
const  session = require("express-session");
const  passport = require("passport");
const  LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const Customer = db.Customer;
const Order = db.Order;
const Product = db.Product;
const User = db.User;

// Allow CORS: To reduce security so we can more easily test our code in the browser.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true, }));

// serve static files from public folder
app.use(express.static('public'));

// set view engine to ejs
app.set("view engine", "ejs");

app.use(methodOverride("_method"));


/***************                                ***************
****************        Product Handling        ***************
/***************                                ***************/

// get all products
app.get("/api/products", function(req,res)  {
  // find all products in the DB
  Product.find(function(err, allProducts) {
    if(err) {
      res.status(500).json({error: err.message})
    } else {
      res.json({Products: allProducts});
    }
  })
})

// Adding one product
app.post('/api/products', function(req,res) {
  var newProduct = new Product(req.body);
  //sanity Check
  console.log(newProduct);
  newProduct.user=req.user;

  newProduct.save(function(err, savedProduct) {
    if(err){
      console.log(err);
    } else {
      console.log(savedProduct);
    }
    //res.send("Product Added");
    res.redirect('/api/products');
  })
})

// Getting one Product
app.get("/api/products/:id", function (req, res) {
  // get product id from url params (`req.params`)
  var prodId = req.params.id;

  // find post in db by id
  Product.findOne({ _id: prodId, }, function (err, foundProd) {
    if (err) {
      if (err.name === "CastError") {
        res.status(404).json({ error: "Nothing found by this ID.", });
      } else {
        res.status(500).json({ error: err.message, });
      }
    } else {
      res.json(foundProd);
    }
  });
});



/***************                                ***************
****************        Customer Handling       ***************
/***************                                ***************/

// show newCustomer view
app.get('/api/customers', function (req, res) {
 res.render('./Customer/newCustomer', {user: req.user});
});


// Adding one product
app.post('/api/customers', function(req,res) {
  var newCustomer = new Customer(req.body);
  //sanity Check
  console.log(newCustomer);
  //newCustomer.user=req.user;

  newCustomer.save(function(err, savedCustomer) {
    if(err){
      console.log(err);
    } else {
      console.log(savedCustomer);
    }
    res.send("Customer Added");
    //res.redirect('/api/products');
  })
})

// Show all customers
app.get("/api/customers", function(req,res)  {
  // find all products in the DB
  Customer.find(function(err, allCustomers) {
    if(err) {
      res.status(500).json({error: err.message})
    } else {
      res.json({Products: allCustomers});
    }
  })
})

/***************                                ***************
****************          Order Handling        ***************
/***************                                ***************/

app.post('/api/orders', function(req,res) {
  var newOrder = new Order(req.body);
  //sanity Check
  console.log(newOrder);
  newOrder.user=req.user;
  newOrder.products.push()=req.body.product;

  newOrder.save(function(err, savedOrder) {
    if(err){
      console.log(err);
    } else {
      console.log(savedOrder);
    }
    res.send("Order Added");
    //res.redirect('/api/products');
  })
})


/***************                                ***************
****************      User and Authentication   ***************
/***************                                ***************/

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function (req, res) {
 Order.find(function (err, allOrders) {
   if (err) {
     res.status(500).json({ error: err.message, });
   } else {
     res.render("index", { posts: allOrders, user: req.user });
   }
 });
});

// AUTH ROUTES

// show signup view
app.get('/signup', function (req, res) {
 res.render('signup');
});

// show login view
app.get('/login', function (req, res) {
 res.render('login');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post("/signup", function (req, res) {
  console.log("sanity check!! pre-signup");
  User.register(new User({ username: req.body.username, fullName: req.body.fullName }), req.body.password,
      function (err, newUser) {
        console.log("Check if it enter function to auth");
        console.log("ERROR", err);
        console.log("NEW USER!!",newUser);
        passport.authenticate("local")(req, res, function() {
          res.redirect('/');
        });
      }
  );
});
// log in user
app.post('/login',passport.authenticate('local'), function (req, res){
  console.log("login successful");
  res.send("User logged in");
});
// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

// Renders Server
app.listen(process.env.PORT || 4000, function () {
    console.log('Checkout http://localhost:4000/');
});
