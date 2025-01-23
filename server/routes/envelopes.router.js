const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.

router.post("/add/", rejectUnauthenticated, (req, res) => {
    const info = {...req.body};
    const queryText = `CREATE TABLE $1 (
                       "id" SERIAL PRIMARY KEY,
                       "envelope" VARCHAR(50) NOT NULL,
                       "name" VARCHAR(30) NOT NULL,
                       "location" VARCHAR(200) NOT NULL,
                       "timeDate" VARCHAR(100) NOT NULL,
                       "ammount" DECIMAL(8) NOT NULL,
                       "recieptLink" VARCHAR(300) NOT NULL,
                       "reviewed" BOOLEAN DEFAULT FALSE,
                       "out_of_pocket" BOOLEAN DEFAULT FALSE,
                       "date" DATE DEFAULT NOW());`
    pool
      .query(queryText, [info.envName])
      .then(() => res.sendStatus(201))
      .catch((err) => console.error("Failed to create new Envelope: ", err))
})



// Export the router to use in the main app.
module.exports = router;