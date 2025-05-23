const express = require("express"); // Import the Express framework to handle routing and HTTP requests.
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.
const axios = require("axios"); // Axios for making HTTP requests (used for reCAPTCHA verification).

/**
 * GET route to fetch all transactions from the database.
 * This route requires the user to be authenticated, using the rejectUnauthenticated middleware.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // SQL query to select all transactions, ordered by ID in descending order.
  const queryText = 'SELECT * From "Transactions" ORDER BY "id" DESC;';
  pool
    .query(queryText) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

/**
 * GET route to fetch transactions from a specific envelope from the database.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.get("/envelope/:envelope", rejectUnauthenticated, (req, res) => {

  const envelope = req.params.envelope;
  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE "envelope"=$1 ORDER BY "id" DESC;';
  pool
    .query(queryText, [envelope]) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.get("/reviewed/", rejectUnauthenticated, (req, res) => {

  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE "reviewed"=TRUE ORDER BY "id" DESC;';
  pool
    .query(queryText) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.get("/reviewed/:envelope", rejectUnauthenticated, (req, res) => {

  const envelope = req.params.envelope;
  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE ("reviewed"=TRUE AND "envelope"=$1) ORDER BY "id" DESC;';
  pool
    .query(queryText, [envelope]) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.get("/:envelope", rejectUnauthenticated, (req, res) => {

  const envelope = req.params.envelope;
  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE "envelope"=$1 ORDER BY "timeDate" DESC;';
  pool
    .query(queryText, [envelope]) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.get("/pocket/", rejectUnauthenticated, (req, res) => {

  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE "out_of_pocket"=TRUE ORDER BY "id" DESC;';
  pool
    .query(queryText) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.get("/pocket/:envelope", rejectUnauthenticated, (req, res) => {

  const envelope = req.params.envelope;
  // SQL query to select all transactions, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Transactions" WHERE ("out_of_pocket"=TRUE AND "envelope"=$1) ORDER BY "id" DESC;';
  pool
    .query(queryText, [envelope]) // Executes the SQL query to fetch transactions.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 400 status code indicating server error.
      console.error("Error fetching specified transactions:", err);
      res.sendStatus(400); // Respond with HTTP status 400 (Internal Server Error).
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const transaction = {...req.body};
  const queryText = `INSERT INTO "Transactions" ("envelope", "name", "location", "timeDate", "amount", "recieptLink", "out_of_pocket", "tag")
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;
  pool
    .query(queryText, [transaction.envelope, transaction.name, transaction.location, transaction.timeDate, transaction.amount, transaction.recieptLink, transaction.outOfPocket, transaction.tag])
    .then((response) => {
      let transId = response.rows[0];
      if(transaction.outOfPocket === "TRUE" || transaction.outOfPocket) {
        const queryText = `INSERT INTO "Checks" ("name", "amount", "recieptLink", "id")
                     VALUES ($1, $2, $3, $4);`;
        pool
          .query(queryText, [transaction.name, transaction.amount, transaction.recieptLink, transId.id])
          .then(() => {res.sendStatus(201)})
          .catch((err) => {
            console.error("Error creating Check: ", err);
            res.sendStatus(400);
          })
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error("Error creating transaction: ", err);
      res.sendStatus(400);
    })
})


/**
 * DELETE route to remove a transaction by its ID.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.delete("/:transactionId", rejectUnauthenticated, (req, res) => {
  // SQL query to delete the transaction from the "transactions" table using the provided transactionId.
  const queryText = `DELETE FROM "Transactions" WHERE id=$1;`;
  pool
    .query(queryText, [req.params.transactionId]) // Execute the delete query.
    .then(() => {
      res.sendStatus(200); // On success, send HTTP status 200 (OK).
    })
    .catch((err) => {
      // Log error if the deletion fails and send a 400 status code indicating server error.
      console.error(err);
      res.sendStatus(400);
    });
});

router.put("/reviewed/:id", rejectUnauthenticated, (req, res) => {
  const transaction = req.params.id;
  const queryText = `UPDATE "Transactions" SET "reviewed"=TRUE WHERE "id"=$1;`;

  pool
    .query(queryText, [transaction])
    .then(() => {res.sendStatus(200)})
    .catch((err) => {
      console.error("Error marking transaction as reviewed:", err);
      res.sendStatus(400);
    })
})

router.put("/reviewedAll", rejectUnauthenticated, async (req, res) => {
  const queryText = `UPDATE "Transactions" SET "reviewed"=TRUE;`;

  pool
    .query(queryText)
    .then(() => {res.sendStatus(200)})
    .catch((err) => {
      console.error("Error marking all transactions as reviewed:", err);
      res.sendStatus(400);
    })
});

/**
 * POST route to verify reCAPTCHA token.
 * This route is used to validate that the user is a real person (anti-bot measure).
 */
router.post("/verify-recaptcha", async (req, res) => {
  // Extract reCAPTCHA token from the request body.
  const { recaptchaToken } = req.body;

  // If the token is missing, send a 400 status indicating bad request.
  if (!recaptchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "Missing reCAPTCHA token." });
  }

  try {
    // Get the secret key for reCAPTCHA from environment variables.
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    // Make a POST request to Google's reCAPTCHA API to validate the token.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: { secret: secretKey, response: recaptchaToken },
      }
    );

    if (response.data.success) {
      // If the reCAPTCHA verification is successful, return a success message.
      res.json({ success: true, message: "reCAPTCHA verified successfully!" });
    } else {
      // If the reCAPTCHA verification fails, return an error message.
      res
        .status(400)
        .json({ success: false, message: "reCAPTCHA verification failed." });
    }
  } catch (error) {
    // Log any error from the reCAPTCHA verification and send a 400 status code.
    console.error("Error verifying reCAPTCHA:", error.message);
    res.status(400).json({ success: false, message: "Internal Server Error." });
  }
});

// Export the router to use in the main app.
module.exports = router;
