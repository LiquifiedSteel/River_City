const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.

router.get("/", rejectUnauthenticated, (req,res) => {
  const queryText = `SELECT * FROM "Envelopes" GROUP BY "envelope";`;

  pool
    .query(queryText)
    .then((response) => res.send(response.rows).status(200))
    .catch((err) => {
      console.error("Failed to collect Envelopes: ", err);
      res.sendStatus(500);
    })
})

router.post("/add/", rejectUnauthenticated, (req, res) => {
    const info = {...req.body};
    
    const queryText = `INSERT INTO "Envelopes" ("envelope") VALUES ($1);`;

    pool
      .query(queryText, [info.envName])
      .then(() => {res.sendStatus(201)})
      .catch((err) => {
        console.error("Error creating Envelope: ", err);
        res.sendStatus(500);
      })
})

router.get("/navBudget", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "Budget" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((response) => res.send(response.rows).status(200))
    .catch((err) => {
      console.error("Failed to collect Budget Items: ", err);
      res.sendStatus(500);
    })
})

router.put("/budget/:amount", rejectUnauthenticated, (req, res) => {;
  const update = req.params.amount
  const queryText = `UPDATE "Budget" SET "amount"=$1 WHERE "type"='Budget';`;

  pool
    .query(queryText, [update])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error("Failed to update annual Budget: ", err);
      res.sendStatus(500);
    })
})


// Export the router to use in the main app.
module.exports = router;