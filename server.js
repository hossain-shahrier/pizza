require("dotenv").config();
// create a new express server
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongodbStore = new require("connect-mongo");

// Route module
const initRoutes = require("./routes/web"); // Declare app as an express server
const app = express();

// Database connection
const url =
  "mongodb+srv://root:root@cluster0.l1797.mongodb.net/pizza?retryWrites=true&w=majority";
mongoose.connect(url);
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
  })
  .on("error", (err) => {
    console.log("MongoDB connection error");
  });

// Session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
    // cookie: { maxAge: 1000 * 8 },
    store: MongodbStore.create({
      mongoUrl: url,
    }),
  })
);
// Path to the public folder
const path = require("path");
// EJS templating engine
const ejs = require("ejs");
// EJS Express Layouts
const expressLayouts = require("express-ejs-layouts");

// Flash
app.use(flash());
// JSON
app.use(express.json());
// Globar middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// express assets
app.use(express.static(path.join(__dirname, "public")));

// Set Template Engine
app.use(expressLayouts);
// Set the view engine to ejs
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// route
initRoutes(app);

// port
const port = process.env.PORT || 3300;
// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on PORT: ${port} `);
  console.log("http://localhost:3300/");
});
