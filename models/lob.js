const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let lobSchema = new Schema({
  category_name: String,
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model("LOB", lobSchema, "LOB");
