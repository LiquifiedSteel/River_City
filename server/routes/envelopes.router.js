const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.

router.get("/", rejectUnauthenticated, (req,res) => {
    const queryText = `SELECT * FROM "Envelopes" ORDER BY "id" ASC;`;

    pool
      .query(queryText)
      .then((response) => res.send(response.rows).status(200))
      .catch((err) => {
        console.error("Failed to collect Envelopes: ", err);
        res.sendStatus(400);
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
        res.sendStatus(400);
      })
})

router.put("/edit/", rejectUnauthenticated, (req,res) => {
    const envelope = req.body.envelope;
    const amount = req.body.total;
    const id = req.body.id;

    const queryText = `UPDATE "Envelopes" SET "envelope"=$1, "total"=$2 WHERE "id"=$3;`;

    pool
      .query(queryText, [envelope, amount, id])
      .then(()=>res.sendStatus(200))
      .catch((err) => {
        console.error("Failed to update envelope: ", err);
        res.sendStatus(400);
      })
})

router.get("/navBudget", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "Budget" ORDER BY "id" ASC;`;
    pool
      .query(queryText)
      .then((response) => res.send(response.rows).status(200))
      .catch((err) => {
        console.error("Failed to collect Budget Items: ", err);
        res.sendStatus(400);
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
        res.sendStatus(400);
      })
})

router.delete("/deleteEnv/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id
  // SQL query to permanently delete the user's account from the database.
  const queryText = `DELETE FROM "Envelopes" WHERE "id"=$1;`;

  // Execute the SQL query to delete the user's record.
  pool
    .query(queryText, [id])
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

// Export the router to use in the main app.
module.exports = router;