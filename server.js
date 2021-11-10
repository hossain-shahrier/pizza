// create a new express server
const express = require("express");
const mongoose = require("mongoose");
// Route module
const initRoutes = require("./routes/web");
// <---Dependencies--->

// Database connection
const url =
  "mongodb+srv://root:root@cluster0.l1797.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url);
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
  })
  .on("error", (err) => {
    console.log("MongoDB connection error");
  });
// Path to the public folder
const path = require("path");
// EJS templating engine
const ejs = require("ejs");
// EJS Express Layouts
const expressLayouts = require("express-ejs-layouts");

// <---Dependencies--->
// Declare app as an express server
const app = express();

// <---Assets--->

// express assets
app.use(express.static(path.join(__dirname, "public")));
// <---Assets--->

// <---View Engine--->

// Set Template Engine
app.use(expressLayouts);
// Set the view engine to ejs
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// <---View Engine--->

// route
initRoutes(app);
// <--Port Declaration--->

// port
const port = process.env.PORT || 3300;
// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on PORT: ${port} `);
  console.log("http://localhost:3300/");
});

// <--Port Declaration--->
