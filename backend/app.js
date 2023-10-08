const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200
}));


// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");
const notification = require("./routes/notificationRoutes");
const message = require("./routes/messageRoutes");



// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", notification);
app.use("/api/v1", message);




module.exports = app;