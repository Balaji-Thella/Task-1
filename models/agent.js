const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let agentSchema = new Schema({
  AgentName: String,
  // "created_at": { type:Date, default:Date.now },
});

module.exports = mongoose.model("Agent", agentSchema, "Agent");
