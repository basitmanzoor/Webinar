const express = require("express");
const app = express();
const webinars = require("./routes/webinars");
const users = require("./routes/users");

const AppError = require("./utils/appError");
const cors = require("cors");
app.use(cors());

const globalErrorHandler = require("./controllers/errorController");

//middleware
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use("/api/v1/webinars", webinars);
app.use("/api/v1/auth", users);

//middleware to handle unhandled requests
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

//error handling middleware
app.use(globalErrorHandler);

module.exports = app;
