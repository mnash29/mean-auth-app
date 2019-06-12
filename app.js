const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose  = require("mongoose");
const users = require('./routes/users');
const config = require("./config/database");

// Connect to database
mongoose.connect(config.database);

// Verify connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});

// Error checking connection
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

// Service port number
const port = 8080;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser middleware
app.use(bodyParser.json());

// Users route
app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

// Start server
app.listen(port, () => {
  console.log("Server started on port: " + port);
});