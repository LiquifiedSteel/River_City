const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.

router.post("/add/", rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const info = {...req.body};
    
    const queryText = `INSERT INTO "Envelopes" ("envelope", "total")
                      VALUES ($1, $2);`;
    pool
      .query(queryText, [info.envName, info.total])
      .then(() => {res.sendStatus(201)})
      .catch((err) => {
        console.error("Error creating Envelope: ", err);
        res.sendStatus(500);
      })
})



// Export the router to use in the main app.
module.exports = router;