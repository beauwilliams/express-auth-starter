const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");

const app = express();

// DB Setup
mongoose.connect(keys.mongoURI);

// App setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

require("./routes/authRoutes")(app);

// Serve the .well-known directory as static
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Server Setup
const PORT = process.env.PORT || 3131;
app.listen(PORT);
