// Dependancies
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route Includes
const applicationRouter = require("./routes/application.router");
const userRouter = require("./routes/user.router");
const excelRouter = require("./routes/excel");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/application", applicationRouter);
app.use("/api/user", userRouter);
app.use("/api/excel", excelRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
