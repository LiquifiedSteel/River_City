const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

/*
 * The /register POST request is used to add the new user's information to the database
 * Username, password, and email will all be stored under the account.
 */
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;

  const queryText = `INSERT INTO "user" ("username", "password", "email")
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

router.put("/newPassword/:password", (req, res) => {
  const password = req.params.password;

  const queryText = `UPDATE "user" SET "password"=$1 WHERE "username"=$2;`;

  pool
    .query(queryText, [password, req.user.username])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error changing password: ", err);
      res.sendStatus(400);
    });
});

router.put("/newEmail/:email", (req, res) => {
  const email = req.params.email;

  const queryText = `UPDATE "user" SET "email"=$1 WHERE "username"=$2;`;

  pool
    .query(queryText, [email, req.user.username])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error changing email: ", err);
      res.sendStatus(400);
    });
});

router.delete("/deleteUser", (req, res) => {
  const queryText = `DELETE FROM "user" WHERE "username"=$1;`;

  pool
    .query(queryText, [req.user.username])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error deleting account: ", err);
      res.sendStatus(400);
    });
});

router.put("/deleteUser", (req, res) => {
  const queryText = `UPDATE "user" SET "deleted"=TRUE WHERE "username"=$1;`;

  pool
    .query(queryText, [req.user.username])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error deleting account: ", err);
      res.sendStatus(400);
    });
});

module.exports = router;
