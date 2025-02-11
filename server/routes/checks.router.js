const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.


/**
 * GET route to fetch all checks from the database.
 * This route requires the user to be authenticated, using the rejectUnauthenticated middleware.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
    // SQL query to select all checks, ordered by ID in descending order.
    const queryText = 'SELECT * From "Checks" ORDER BY "id" DESC;';
    pool
      .query(queryText) // Executes the SQL query to fetch checks.
      .then((result) => {
        res.send(result.rows); // On success, send the rows of the result to the client.
      })
      .catch((err) => {
        // Log error if the query fails and send a 400 status code indicating server error.
        console.error("Error fetching checks:", err);
        res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
      });
  });


router.put("/paid/:id", rejectUnauthenticated, (req, res) => {
    const check = req.params.id;
  
    const queryText = `UPDATE "Checks" SET "paid"=TRUE WHERE "id"=$1;`;
  
    pool
      .query(queryText, [check])
      .then(() => {
        const queryText = `UPDATE "Transactions" SET "paid"=TRUE WHERE "id"=$1;`

        pool
          .query(queryText, [check])
          .then(() => res.sendStatus(200))
          .catch((err) => {
            console.error("Error marking transaction OOP as paid: ", err);
            res.sendStatus(400);
          })
      })
      .catch((err) => {
        console.error("Error marking check as paid:", err);
        res.sendStatus(400);
      })
})


// Export the router to use in the main app.
module.exports = router;