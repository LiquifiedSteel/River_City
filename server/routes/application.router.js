const express = require("express");
const pool = require("../modules/pool"); // Import the database pool to handle SQL queries.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated users.
const router = express.Router(); // Create a new Express router to define routes.
const axios = require("axios"); // Axios for making HTTP requests (used for reCAPTCHA verification).

/**
 * GET route to fetch all requests from the database.
 * This route requires the user to be authenticated, using the rejectUnauthenticated middleware.
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // SQL query to select all requests, ordered by ID in descending order.
  const queryText = 'SELECT * From "Requests" ORDER BY "id" DESC';
  pool
    .query(queryText) // Executes the SQL query to fetch requests.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 500 status code indicating server error.
      console.error("Error fetching requests:", err);
      res.sendStatus(500); // Respond with HTTP status 500 (Internal Server Error).
    });
});

/**
 * GET route to fetch all locations from the database.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.get("/locations", rejectUnauthenticated, (req, res) => {
  // SQL query to select all locations, ordered by ID in ascending order.
  const queryText = 'SELECT * From "Locations" ORDER BY "id" ASC';
  pool
    .query(queryText) // Executes the SQL query to fetch locations.
    .then((result) => {
      res.send(result.rows); // On success, send the rows of the result to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 500 status code indicating server error.
      console.error("Error fetching locations:", err);
      res.sendStatus(500); // Respond with HTTP status 500 (Internal Server Error).
    });
});

/**
 * GET route to fetch a specific request by its ID.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.get("/:requestID", rejectUnauthenticated, (req, res) => {
  // SQL query to select a request by its ID.
  const queryText = 'SELECT * From "Requests" WHERE id=$1;';
  pool
    .query(queryText, [req.params.requestID]) // Executes the SQL query with the request ID parameter.
    .then((result) => {
      res.send(result.rows); // On success, send the result rows (request) to the client.
    })
    .catch((err) => {
      // Log error if the query fails and send a 500 status code indicating server error.
      console.error("Error fetching requests:", err);
      res.sendStatus(500); // Respond with HTTP status 500 (Internal Server Error).
    });
});

/**
 * POST route to create a new request.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure and extract values from the request body.
  const {
    team_org_event,
    title_w_team_org_event,
    coach_contact_first_name,
    coach_contact_last_name,
    coach_contact_email,
    coach_contact_phone,
    website,
    event_type,
    rented_previously,
    preferred_time,
    preferred_location_primary,
    preferred_location_secondary,
    preferred_space,
    priority,
    preferred_days,
    start_date,
    end_date,
    additional_dates,
    expected_attendance,
    WF_students,
    grade_level,
    team_pdf,
    renter_first_name,
    renter_last_name,
    renter_street_address,
    renter_city,
    renter_state,
    renter_zip,
    renter_phone,
    renter_email,
  } = req.body;

  // SQL query to insert a new request into the "Requests" table.
  const queryText = `
    INSERT INTO "Requests" (
      "team_org_event", 
      "title_w_team_org_event",
      "coach_contact_first_name",
      "coach_contact_last_name",
      "coach_contact_email",
      "coach_contact_phone",
      "website",
      "event_type",
      "rented_previously",
      "preferred_time",
      "preferred_location_primary",
      "preferred_location_secondary",
      "preferred_space",
      "priority",
      "preferred_days",
      "start_date",
      "end_date",
      "additional_dates",
      "expected_attendance",
      "WF_students",
      "grade_level",
      "team_pdf",
      "renter_first_name",
      "renter_last_name",
      "renter_street_address",
      "renter_city",
      "renter_state",
      "renter_zip",
      "renter_phone",
      "renter_email"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
     $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)
    RETURNING id;
  `;
  pool
    .query(queryText, [
      team_org_event,
      title_w_team_org_event,
      coach_contact_first_name,
      coach_contact_last_name,
      coach_contact_email,
      coach_contact_phone,
      website,
      event_type,
      rented_previously,
      preferred_time,
      preferred_location_primary,
      preferred_location_secondary,
      preferred_space,
      priority,
      preferred_days,
      start_date,
      end_date,
      additional_dates,
      expected_attendance,
      WF_students,
      grade_level,
      team_pdf,
      renter_first_name,
      renter_last_name,
      renter_street_address,
      renter_city,
      renter_state,
      renter_zip,
      renter_phone,
      renter_email,
    ])
    .then((result) => {
      res.sendStatus(201); // Respond with HTTP status 201 (Created).
    })
    .catch((err) => {
      // Log error if the query fails and send a 500 status code indicating server error.
      console.error("Error creating request", err);
      res.status(500); // Respond with HTTP status 500 (Internal Server Error).
    });
});

/**
 * PUT route to update an existing request by its ID.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.put("/:applicationId", rejectUnauthenticated, (req, res) => {
  // Extract the applicationId from the request parameters.
  const applicationId = req.params.applicationId;

  // Destructure and extract values from the request body (similar to POST route).
  const {
    team_org_event,
    title_w_team_org_event,
    coach_contact_first_name,
    coach_contact_last_name,
    coach_contact_email,
    coach_contact_phone,
    website,
    event_type,
    rented_previously,
    preferred_time,
    preferred_location_primary,
    preferred_location_secondary,
    preferred_space,
    priority,
    preferred_days,
    start_date,
    end_date,
    additional_dates,
    expected_attendance,
    WF_students,
    grade_level,
    team_pdf,
    renter_first_name,
    renter_last_name,
    renter_street_address,
    renter_city,
    renter_state,
    renter_zip,
    renter_phone,
    renter_email,
  } = req.body;

  // SQL query to update an existing request in the "Requests" table using the provided applicationId.
  const queryText = `
     UPDATE "Requests" SET
      "team_org_event"=$1, 
      "title_w_team_org_event"=$2,
      "coach_contact_first_name"=$3,
      "coach_contact_last_name"=$4,
      "coach_contact_email"=$5,
      "coach_contact_phone"=$6,
      "website"=$7,
      "event_type"=$8,
      "rented_previously"=$9,
      "preferred_time"=$10,
      "preferred_location_primary"=$11,
      "preferred_location_secondary"=$12,
      "preferred_space"=$13,
      "priority"=$14,
      "preferred_days"=$15,
      "start_date"=$16,
      "end_date"=$17,
      "additional_dates"=$18,
      "expected_attendance"=$19,
      "WF_students"=$20,
      "grade_level"=$21,
      "team_pdf"=$22,
      "renter_first_name"=$23,
      "renter_last_name"=$24,
      "renter_street_address"=$25,
      "renter_city"=$26,
      "renter_state"=$27,
      "renter_zip"=$28,
      "renter_phone"=$29,
      "renter_email"=$30 WHERE "id"=$31;
  `;

  pool
    .query(queryText, [
      team_org_event,
      title_w_team_org_event,
      coach_contact_first_name,
      coach_contact_last_name,
      coach_contact_email,
      coach_contact_phone,
      website,
      event_type,
      rented_previously,
      preferred_time,
      preferred_location_primary,
      preferred_location_secondary,
      preferred_space,
      priority,
      preferred_days,
      start_date,
      end_date,
      additional_dates,
      expected_attendance,
      WF_students,
      grade_level,
      team_pdf,
      renter_first_name,
      renter_last_name,
      renter_street_address,
      renter_city,
      renter_state,
      renter_zip,
      renter_phone,
      renter_email,
      applicationId,
    ])
    .then((result) => {
      res.sendStatus(200); // Respond with HTTP status 200 (OK).
    })
    .catch((err) => {
      // Log error if the update fails and send a 500 status code indicating server error.
      console.error("Error updating request: ", err);
      res.status(500); // Respond with HTTP status 500 (Internal Server Error).
    });
});

/**
 * DELETE route to remove a request by its ID.
 * Requires authentication via the rejectUnauthenticated middleware.
 */
router.delete("/:applicationId", rejectUnauthenticated, (req, res) => {
  // SQL query to delete the request from the "Requests" table using the provided applicationId.
  const queryText = `DELETE FROM "Requests" WHERE id=$1`;
  pool
    .query(queryText, [req.params.applicationId]) // Execute the delete query.
    .then(() => {
      res.sendStatus(200); // On success, send HTTP status 200 (OK).
    })
    .catch((err) => {
      // Log error if the deletion fails and send a 500 status code indicating server error.
      console.error(err);
      res.sendStatus(500);
    });
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
    // Log any error from the reCAPTCHA verification and send a 500 status code.
    console.error("Error verifying reCAPTCHA:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});

// Export the router to use in the main app.
module.exports = router;
