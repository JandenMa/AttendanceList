const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ListSchema = new Schema({
  id: { type: String, required: true, max: 20 },
  month: { type: String, required: true, max: 32 },
  attendances: { type: Array, required: true }
});

module.exports = mongoose.model("AttendList", ListSchema);
