const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

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
    teamOrgEvent,
    titleTeamOrgEvent,
    coachContactFirstName,
    coachContactLastName,
    coachContactEmail,
    coachContactPhone,
    website,
    eventType,
    rentedPreviously,
    preferredTime,
    preferredLocationPrimary,
    preferredLocationSecondary,
    preferredSpace,
    priority,
    preferredDays,
    startDate,
    endDate,
    additionalDates,
    expectedAttendance,
    WFStudents,
    gradeLevel,
    teamPdf,
    readRentalReview,
    renterFirstName,
    renterLastName,
    renterStreetAddress,
    renterCity,
    renterState,
    renterZip,
    renterPhone,
    renterEmail,
    agreeToRespectfulUseOfSpace,
    agreeToInvoicePaymentProcess,
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
      "85%_WF_students",
      "grade_level",
      "team_pdf",
      "read_rental_review",
      "renter_first_name",
      "renter_last_name",
      "renter_street_address",
      "renter_city",
      "renter_state",
      "renter_zip",
      "renter_phone",
      "renter_email",
      "agree_to_respectful_use_of_space",
      "agree_to_invoice_payment_process"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
     $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
    RETURNING id;
  `;
  pool
    .query(queryText, [
      teamOrgEvent,
      titleTeamOrgEvent,
      coachContactFirstName,
      coachContactLastName,
      coachContactEmail,
      coachContactPhone,
      website,
      eventType,
      rentedPreviously,
      preferredTime,
      preferredLocationPrimary,
      preferredLocationSecondary,
      preferredSpace,
      priority,
      preferredDays,
      startDate,
      endDate,
      additionalDates,
      expectedAttendance,
      WFStudents,
      gradeLevel,
      teamPdf,
      readRentalReview,
      renterFirstName,
      renterLastName,
      renterStreetAddress,
      renterCity,
      renterState,
      renterZip,
      renterPhone,
      renterEmail,
      agreeToRespectfulUseOfSpace,
      agreeToInvoicePaymentProcess,
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
    teamOrgEvent,
    titleTeamOrgEvent,
    coachContactFirstName,
    coachContactLastName,
    coachContactEmail,
    coachContactPhone,
    website,
    eventType,
    rentedPreviously,
    preferredTime,
    preferredLocationPrimary,
    preferredLocationSecondary,
    preferredSpace,
    priority,
    preferredDays,
    startDate,
    endDate,
    additionalDates,
    expectedAttendance,
    WFStudents,
    gradeLevel,
    teamPdf,
    readRentalReview,
    renterFirstName,
    renterLastName,
    renterStreetAddress,
    renterCity,
    renterState,
    renterZip,
    renterPhone,
    renterEmail,
    agreeToRespectfulUseOfSpace,
    agreeToInvoicePaymentProcess,
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
      "85%_WF_students"=$20,
      "grade_level"=$21,
      "team_pdf"=$22,
      "read_rental_review"=$23,
      "renter_first_name"=$24,
      "renter_last_name"=$25,
      "renter_street_address"=$26,
      "renter_city"=$27,
      "renter_state"=$28,
      "renter_zip"=$29,
      "renter_phone"=$30,
      "renter_email"=$31,
      "agree_to_respectful_use_of_space"=$32,
      "agree_to_invoice_payment_process"=$33 WHERE "id"=$34;
  `;

  pool
    .query(queryText, [
      teamOrgEvent,
      titleTeamOrgEvent,
      coachContactFirstName,
      coachContactLastName,
      coachContactEmail,
      coachContactPhone,
      website,
      eventType,
      rentedPreviously,
      preferredTime,
      preferredLocationPrimary,
      preferredLocationSecondary,
      preferredSpace,
      priority,
      preferredDays,
      startDate,
      endDate,
      additionalDates,
      expectedAttendance,
      WFStudents,
      gradeLevel,
      teamPdf,
      readRentalReview,
      renterFirstName,
      renterLastName,
      renterStreetAddress,
      renterCity,
      renterState,
      renterZip,
      renterPhone,
      renterEmail,
      agreeToRespectfulUseOfSpace,
      agreeToInvoicePaymentProcess,
      applicationId,
    ])
    .then((result) => {
      console.log("Created a new request", result.rows[0]);
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

module.exports = router;
