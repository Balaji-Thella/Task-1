const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userAccountSchema = new Schema({
  AccountName: String,
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model(
  "Users_Account",
  userAccountSchema,
  "Users_Account"
);
