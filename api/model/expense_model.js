const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  amount: Number,
  comment: String,
  category: String,
  type: String,
});

module.exports = mongoose.model("expense", expenseSchema);
