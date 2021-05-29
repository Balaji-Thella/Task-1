const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PolicySchema = new Schema({
  policy_number: String,
  policy_start_date: String,
  policy_end_date: String,
  policy_category: String,
  company_collection_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrier",
    index: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model("Policy", PolicySchema, "Policy");
