// Bring Mongoose into the app
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

// Create the database connection
mongoose
  .connect("mongodb://localhost:27017/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
  console.log(
    "Mongoose default connection open to " + "mongodb://localhost:27017/app"
  );
  console.log("Mongoose default connection open to DATE" + new Date());
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected", new Date());
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

require("./agent");
require("./carrier");
require("./lob");
require("./policy");
require("./user_account");
require("./user");
