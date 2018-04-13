var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

  var UserSchema = new Schema({
    fullName: {
          type: String,
      },
    username: {
          type: String,
      },
    password: {
          type: String,
      }
  });

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
