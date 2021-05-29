const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstname: String,
  Dob: String,
  address: String,
  phonenumber: String,
  state: String,
  zipcode: String,
  email: String,
  gender: String,
  userType: String,
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model("User", userSchema, "User");
