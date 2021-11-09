// create a new express server
const express = require("express");

// <---Dependencies--->

// Path to the public folder
const path = require("path");
// EJS templating engine
const ejs = require("ejs");
// EJS Express Layouts
const expressLayouts = require("express-ejs-layouts");

// <---Dependencies--->

// Declare app as an express server
const app = express();

// route
app.get("/", (req, res) => {
  res.render("home");
});

// <---View Engine--->

// Set Template Engine
app.use(expressLayouts);
// Set the view engine to ejs
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// <---View Engine--->

// <--Port Declaration--->

// port
const port = process.env.PORT || 3300;
// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on PORT: ${port} `);
});

// <--Port Declaration--->
