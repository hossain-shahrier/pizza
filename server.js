// create a new express server
const express = require("express");

// <---Dependencies--->

// Path to the public folder
const path = require("path");
// EJS templating engine
const ejs = require("ejs");
// EJS Express Layouts
const expressLayouts = require("express-ejs-layouts");

// Declare app as an express server
const app = express();

// <---Assets--->

// express assets
app.use(express.static(path.join(__dirname, "public")));
// <---Assets--->

// <---Dependencies--->

// <---View Engine--->

// Set Template Engine
app.use(expressLayouts);
// Set the view engine to ejs
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// <---View Engine--->

// route
// Home route
app.get("/", (req, res) => {
  res.render("home");
});
// Cart route
app.get("/cart", (req, res) => {
  res.render("customers/cart");
});
// Login route
app.get("/login", (req, res) => {
  res.render("auth/login");
});
// Register route
app.get("/register", (req, res) => {
  res.render("auth/register");
});

// <--Port Declaration--->

// port
const port = process.env.PORT || 3300;
// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on PORT: ${port} `);
  console.log("http://localhost:3300/");
});

// <--Port Declaration--->
