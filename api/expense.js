const mongoose = require("mongoose");

const MONGODB_URI = "MONGODB_CONNECTION_URI";

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = (req, res) => {
  const conection = connectToDatabase();
  const expenseSchema = mongoose.Schema({
    amount: String,
    comment: String,
    category: String,
    type: String,
  });

  const expense = mongoose.model("expense", expenseSchema);
  const dbcallback = (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ result: "Internal sever error" });
    }
    // console.log(data);
    res.status(201).json(data);
  };

  conection.then(() => {
    if (req.method === "GET") {
      expense.find(dbcallback);
    } else if (req.method === "POST") {
      const exp = new expense(req.body);
      exp.save(dbcallback);
    } else if (req.method === "DELETE") {
      expense.deleteOne({ _id: req.body._id }, dbcallback);
    }
  });
};

// GET - fetch
// POST- new data add
// PUT - modify
// DELETE - delete
