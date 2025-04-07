const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.

router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "Budget" ORDER BY "year" DESC;`;
    pool
      .query(queryText)
      .then((response) => res.send(response.rows).status(200))
      .catch((err) => {
        console.error("Failed to collect Budget Items: ", err);
        res.sendStatus(400);
      });
})

router.put("/", rejectUnauthenticated, (req, res) => {;
    const amount = req.body.amount;
    const year = req.body.year;

    const queryText = `UPDATE "Budget" SET "amount"=$1 WHERE "year"=$2;`;

    pool
      .query(queryText, [amount, year])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error("Failed to update annual Budget: ", err);
        res.sendStatus(400);
      })
})

module.exports = router;