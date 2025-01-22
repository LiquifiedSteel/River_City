// Dependancies
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route Includes
const transactionsRouter = require("./routes/transactions.router");
const checksRouter = require("./routes/checks.router");
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
app.use("/api/checks", checksRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/user", userRouter);
app.use("/api/excel", excelRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
