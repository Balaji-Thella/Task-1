const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CarrierSchema = new Schema({
  company_name: String,
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model("Carrier", CarrierSchema, "Carrier");
