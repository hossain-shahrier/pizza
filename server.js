// create a new express server
const express = require("express");
const app = express();
// port
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
