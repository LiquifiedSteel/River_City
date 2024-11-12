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

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  //  POST route code here
  console.log("new request sent", req.body);
  const {
    team_org_event,
    title_w_team_org_event,
    coach_Contact_first_name,
    coach_Contact_last_name,
    coach_contact_email,
    coach_contact_phone,
    website,
    event_type,
    rented_previously,
    PreferredTime_start,
    PreferredTime_end,
    Preferred_Location_primary,
    Preferred_Location_secondary,
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
    read_Rental_Review,
    renter_first_name,
    renter_last_name,
    renter_street_address,
    renter_city,
    renter_state,
    renter_zip,
    renter_phone,
    renter_email,
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
      "preferred_time_start",
      "preferred_time_end",
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
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)
    RETURNING id;
  `;
  pool
    .query(queryText, [
      team_org_event,
      title_w_team_org_event,
      coach_Contact_first_name,
      coach_Contact_last_name,
      coach_contact_email,
      coach_contact_phone,
      website,
      event_type,
      rented_previously,
      PreferredTime_start,
      PreferredTime_end,
      Preferred_Location_primary,
      Preferred_Location_secondary,
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
      read_Rental_Review,
      renter_first_name,
      renter_last_name,
      renter_street_address,
      renter_city,
      renter_state,
      renter_zip,
      renter_phone,
      renter_email,
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

  /**
   * PUT route template
   */
  router.put("/:applicationId", rejectUnauthenticated, (req, res) => {
    //  PUT route code here
    console.log("new request sent", req.params);
    let applicationId = req.params.applicationId;
    const {
      team_org_event,
      title_w_team_org_event,
      coach_Contact_first_name,
      coach_Contact_last_name,
      coach_contact_email,
      coach_contact_phone,
      website,
      event_type,
      rented_previously,
      PreferredTime_start,
      PreferredTime_end,
      Preferred_Location_primary,
      Preferred_Location_secondary,
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
      read_Rental_Review,
      renter_first_name,
      renter_last_name,
      renter_street_address,
      renter_city,
      renter_state,
      renter_zip,
      renter_phone,
      renter_email,
      agreeToRespectfulUseOfSpace,
      agreeToInvoicePaymentProcess,
    } = req.body;

    const queryText = `
     UPDATE "Requests" SET
      "team_org_event"=$1, 
      "title_w_team_org_event"=$2,
      "coach_contact_first_name"=$3,
      "coach_contact_last_name"$4,
      "coach_contact_email"=$5,
      "coach_contact_phone"=$6,
      "website"=$7,
      "event_type"=$8,
      "rented_previously"=$9,
      "preferred_time_start"=$10,
      "preferred_time_end"=$11,
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
      "read_rental_review"=$24,
      "renter_first_name"=$25,
      "renter_last_name"=$26,
      "renter_street_address"=$27,
      "renter_city"=$28,
      "renter_state"=$29,
      "renter_zip"=$30,
      "renter_phone"=$31,
      "renter_email"=$32,
      "agree_to_respectful_use_of_space"=$33,
      "agree_to_invoice_payment_process"=$34 WHERE "id"=$35;
  `;

    pool
      .query(queryText, [
        team_org_event,
        title_w_team_org_event,
        coach_Contact_first_name,
        coach_Contact_last_name,
        coach_contact_email,
        coach_contact_phone,
        website,
        event_type,
        rented_previously,
        PreferredTime_start,
        PreferredTime_end,
        Preferred_Location_primary,
        Preferred_Location_secondary,
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
        read_Rental_Review,
        renter_first_name,
        renter_last_name,
        renter_street_address,
        renter_city,
        renter_state,
        renter_zip,
        renter_phone,
        renter_email,
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
  //Delete Route Template
  router.delete("/:applicationId", rejectUnauthenticated, (req, res) => {
    console.log("req.params", req.params);
    const queryText = `DELETE FROM "Requests" WHERE id=$1`;
    pool
      .query(queryText, [req.params.applicationId])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
});

module.exports = router;
