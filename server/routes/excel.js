const express = require("express");
const ExcelJS = require("exceljs");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/export", async (req, res) => {
  try {
    const queryText = `SELECT * FROM "Requests" ORDER BY "id" DESC`;
    const { rows: requestData } = await pool.query(queryText);

    // ====== Create a new workbook and worksheet ======
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Requests Data");

    // ====== Define worksheet columns ======
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Team/Organization/Event", key: "team_org_event", width: 25 },
      { header: "Title", key: "title_w_team_org_event", width: 30 },
      {
        header: "Coach First Name",
        key: "coach_contact_first_name",
        width: 20,
      },
      { header: "Coach Last Name", key: "coach_contact_last_name", width: 20 },
      { header: "Coach Email", key: "coach_contact_email", width: 30 },
      { header: "Coach Phone", key: "coach_contact_phone", width: 15 },
      { header: "Website", key: "website", width: 30 },
      { header: "Event Type", key: "event_type", width: 15 },
      { header: "Preferred Time", key: "preferred_time", width: 20 },
      {
        header: "Primary Location",
        key: "preferred_location_primary",
        width: 20,
      },
      {
        header: "Secondary Location",
        key: "preferred_location_secondary",
        width: 20,
      },
      { header: "Preferred Space", key: "preferred_space", width: 40 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Start Date", key: "start_date", width: 15 },
      { header: "End Date", key: "end_date", width: 15 },
      { header: "Expected Attendance", key: "expected_attendance", width: 20 },
      { header: "Grade Level", key: "grade_level", width: 15 },
      { header: "WF Students", key: "WF_students", width: 15 },
      { header: "Rented Previously", key: "rented_previously", width: 20 },
      { header: "Special Requests", key: "special_requests", width: 40 },
    ];

    requestData.forEach((request) => {
      worksheet.addRow(request);
    });

    worksheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Requests_Data.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting data to Excel:", error);
    res.status(500).send("Failed to export data to Excel");
  }
});

module.exports = router;
