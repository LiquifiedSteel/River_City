const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = 'SELECT * From "Requests" ORDER BY "id" DESC';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching requests:", err);
      res.sendStatus(500);
    });
});

router.get("/locations", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = 'SELECT * From "Locations" ORDER BY "id" ASC';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching locations:", err);
      res.sendStatus(500);
    });
});

router.get("/:requestID", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = 'SELECT * From "Requests" WHERE id=$1;';
  pool
    .query(queryText, [req.params.requestID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching requests:", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  //  POST route code here
  console.log("new request sent", req.body);
  const {
    team_org_event,
    title_w_team_org_event,
    coach_contact_first_name,
    coach_contact_last_name,
    coach_contact_email,
    coach_contact_phone,
    website,
    event_type,
    event_description,
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
    renter_email
  } = req.body;

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
      event_description,
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
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)
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
    event_description,
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
    renter_email
    ])
    .then((result) => {
      console.log("Created a new request", result.rows[0]);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("Error creating request", err);
      res.status(500);
    });
});

/**
 * PUT route template
 */
router.put("/:applicationId", rejectUnauthenticated, (req, res) => {
  //  PUT route code here
  console.log("new request sent", req.params);
  const applicationId = req.params.applicationId;
  const {
    team_org_event,
    title_w_team_org_event,
    coach_contact_first_name,
    coach_contact_last_name,
    coach_contact_email,
    coach_contact_phone,
    website,
    event_type,
    event_description,
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
      "event_description"=$9,
      "rented_previously"=$10,
      "preferred_time"=$11,
      "preferred_location_primary"=$12,
      "preferred_location_secondary"=$13,
      "preferred_space"=$14,
      "priority"=$15,
      "preferred_days"=$16,
      "start_date"=$17,
      "end_date"=$18,
      "additional_dates"=$19,
      "expected_attendance"=$20,
      "WF_students"=$21,
      "grade_level"=$22,
      "team_pdf"=$23,
      "renter_first_name"=$24,
      "renter_last_name"=$25,
      "renter_street_address"=$26,
      "renter_city"=$27,
      "renter_state"=$28,
      "renter_zip"=$29,
      "renter_phone"=$30,
      "renter_email"=$31 WHERE "id"=$32;
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
      event_description,
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
      console.log("Updated a request", applicationId);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error updating request: ", err);
      res.status(500);
    });
});
//Delete Route Template
router.delete("/:applicationId", rejectUnauthenticated, (req, res) => {
  console.log("req.params", req.params);
  const queryText = `DELETE FROM "Requests" WHERE id=$1`;
  pool
    .query(queryText, [req.params.applicationId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post("/verify-recaptcha", async (req, res) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "Missing reCAPTCHA token." });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: { secret: secretKey, response: recaptchaToken },
      }
    );

    if (response.data.success) {
      res.json({ success: true, message: "reCAPTCHA verified successfully!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "reCAPTCHA verification failed." });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});

module.exports = router;
