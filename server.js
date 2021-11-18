require("dotenv").config();
// create a new express server
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongodbStore = new require("connect-mongo");
const passport = require("passport");
const Emitter = require("events");
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
// Event emittter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);
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

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Path to the public folder
const path = require("path");
// EJS templating engine
const ejs = require("ejs");
// EJS Express Layouts
const expressLayouts = require("express-ejs-layouts");
const Order = require("./app/models/order");

// Flash
app.use(flash());
// JSON
app.use(express.json());
//URL Encoded
app.use(express.urlencoded({ extended: false }));
// Globar middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
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
const server = app.listen(port, () => {
  console.log(`Listening on PORT: ${port} `);
  console.log("http://localhost:3300/");
});
// Socket.io
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  //Join
  socket.on("join", (orderId) => {
    console.log(orderId);
    socket.join(orderId);
  });
});
eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

// Admin
eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});
