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
  // POST route code here
  console.log("new request sent", req.body);
  const {
    team_org_event,
    title_w_team_org_event,
    Coach_Contact_first_name,
    Coach_Contact_last_name,
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
  const queryText = ` INSERT INTO "Requests"
	("team_org_event" 
	"title_w_team_org_event" ,
	"Coach_Contact_first_name" ,
	"Coach_Contact_last_name" ,
	"coach_contact_email" ,
	"coach_contact_phone",
	"website",
	"event_type",
	"rented_previously",
	"PreferredTime_start",
	"PreferredTime_end",
	"Preferred_Location:primary",
	"Preferred_Location:secondary" ,
	"preferred_space",
	"priority" ,
	"preferred_days" ,
	"start_date",
	"end_date" ,
	"additional_dates" ,
	"expected_attendance" ,
	"85%_WF_students",
	"grade_level" ,
	"team_pdf" ,
	"read_Rental_Review",
	"renter_first_name",
	"renter_last_name",
	"renter_street_address",
	"renter_city",
	"renter_state",
	"renter_zip",
	"renter_phone",
	"renter_email",
	"agreeToRespectfulUseOfSpace",
	"agreeToInvoicePaymentProcess") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
  $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)`;
});

module.exports = router;
