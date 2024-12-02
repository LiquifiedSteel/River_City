const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Import middleware to ensure routes are protected and require authentication.
const encryptLib = require("../modules/encryption"); // Import the encryption module to securely store passwords.
const pool = require("../modules/pool"); // Import the pool module to manage database connections and execute queries.
const userStrategy = require("../strategies/user.strategy"); // Import the user authentication strategy (local strategy).
const router = express.Router(); // Create an instance of an Express router to define our route handlers.

// ** GET Route: Fetching user information (authenticated only) **
// This route sends back the user object stored in the session if the user is authenticated.
// It returns user details that were previously queried from the database and stored in the session.
router.get("/", rejectUnauthenticated, (req, res) => {
  // Respond with the user object from the session (stored after successful login).
  res.send(req.user);
});

/**
 * POST Route: Register a new user
 * This route accepts user registration details (username, password, and email),
 * encrypts the password, and stores the information in the "user" table in the database.
 */
router.post("/register", (req, res, next) => {
  // Extract the user's information from the request body (username, password, and email).
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password); // Encrypt the password before storing it.
  const email = req.body.email;

  // SQL query to insert the new user's details into the "user" table, returning the new user's ID.
  const queryText = `INSERT INTO "user" ("username", "password", "email")
    VALUES ($1, $2, $3) RETURNING id`;

  // Execute the query to add the new user to the database.
  pool
    .query(queryText, [username, password, email])
    .then(() => res.sendStatus(201)) // On success, respond with HTTP status 201 (Created).
    .catch((err) => {
      // Log the error if registration fails and send an HTTP 500 (Internal Server Error).
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

/**
 * POST Route: Handle user login
 * This route authenticates the user using the local authentication strategy.
 * The `userStrategy.authenticate('local')` middleware handles checking the username and password.
 */
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  // If authentication is successful, the user is logged in, and we return HTTP status 200 (OK).
  res.sendStatus(200);
});

/**
 * POST Route: User logout
 * This route clears all session information related to the currently authenticated user.
 * It uses Passport's built-in `logout` method to destroy the session and log out the user.
 */
router.post("/logout", (req, res, next) => {
  // Call Passport's logout method to clear the session for the logged-in user.
  req.logout((err) => {
    if (err) {
      // If an error occurs during logout, pass it to the next middleware (error handler).
      return next(err);
    }
    // If logout is successful, respond with HTTP status 200 (OK).
    res.sendStatus(200);
  });
});

/**
 * PUT Route: Change user password
 * This route updates the user's password in the database. The new password is passed in the URL parameter.
 * The password is not encrypted in the URL, so ensure proper security measures are in place.
 */
router.put("/newPassword/:password", (req, res) => {
  const password = req.params.password; // Retrieve the new password from the URL parameter.

  // SQL query to update the password in the "user" table based on the authenticated user's username.
  const queryText = `UPDATE "user" SET "password"=$1 WHERE "username"=$2;`;

  // Execute the SQL query to update the password in the database.
  pool
    .query(queryText, [password, req.user.username])
    .then(() => {
      // On success, send HTTP status 200 (OK) indicating the password was updated.
      res.sendStatus(200);
    })
    .catch((err) => {
      // Log the error if the password update fails, and respond with HTTP status 400 (Bad Request).
      console.error("Error changing password: ", err);
      res.sendStatus(400);
    });
});

/**
 * PUT Route: Change user email
 * This route updates the user's email address in the database. The new email is passed as a URL parameter.
 */
router.put("/newEmail/:email", (req, res) => {
  // Retrieve the new email from the URL parameter.
  const email = req.params.email;

  // SQL query to update the email address in the "user" table based on the authenticated user's username.
  const queryText = `UPDATE "user" SET "email"=$1 WHERE "username"=$2;`;

  // Execute the SQL query to update the email in the database.
  pool
    .query(queryText, [email, req.user.username])
    .then(() => {
      // On success, send HTTP status 200 (OK) indicating the email was updated.
      res.sendStatus(200);
    })
    .catch((err) => {
      // Log the error if the email update fails, and respond with HTTP status 400 (Bad Request).
      console.error("Error changing email: ", err);
      res.sendStatus(400);
    });
});

/**
 * DELETE Route: Permanently delete a user's account
 * This route deletes the user's information from the "user" table in the database based on their username.
 */
router.delete("/deleteUser", (req, res) => {
  // SQL query to permanently delete the user's account from the database.
  const queryText = `DELETE FROM "user" WHERE "username"=$1;`;

  // Execute the SQL query to delete the user's record.
  pool
    .query(queryText, [req.user.username])
    .then(() => {
      // On success, send HTTP status 200 (OK) indicating the user was successfully deleted.
      res.sendStatus(200);
    })
    .catch((err) => {
      // Log the error if the deletion fails, and respond with HTTP status 400 (Bad Request).
      console.error("Error deleting account: ", err);
      res.sendStatus(400);
    });
});

/**
 * PUT Route: Soft delete user account (Mark as deleted)
 * This route marks a user's account as "deleted" by setting a "deleted" flag to TRUE in the database.
 * This is a soft delete, meaning the user record is not removed, but it is flagged as deleted.
 */
router.put("/deleteUser", (req, res) => {
  // SQL query to update the "deleted" flag to TRUE in the "user" table based on the authenticated user's username.
  const queryText = `UPDATE "user" SET "deleted"=TRUE WHERE "username"=$1;`;

  // Execute the SQL query to flag the user as deleted.
  pool
    .query(queryText, [req.user.username])
    .then(() => {
      // On success, send HTTP status 200 (OK) indicating the account was marked as deleted.
      res.sendStatus(200);
    })
    .catch((err) => {
      // Log the error if the update fails, and respond with HTTP status 400 (Bad Request).
      console.error("Error deleting account: ", err);
      res.sendStatus(400);
    });
});

// Export the router to use in the main application.
module.exports = router;
