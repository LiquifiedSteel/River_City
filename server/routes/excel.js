const express = require("express");
const ExcelJS = require("exceljs");
const pool = require("../modules/pool");
const router = express.Router();

router.post("/export", async (req, res) => {
  try {
    const queryText = `SELECT * FROM "Transactions" ORDER BY "envelope" ASC`;
    const { rows: transactionsData } = await pool.query(queryText);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Transactions");

    worksheet.columns = [
      { header: "Tag", key: "tag", width: 10 },
      { header: "Envelope", key: "envelope", width: 10 },
      { header: "Name", key: "name", width: 10 },
      { header: "Location of Transaction", key: "location", width: 10 },
      { header: "Date of Transaction", key: "timeDate", width: 10 },
      { header: "Amount Spent", key: "amount", width: 10 },
      { header: "Reviewed", key: "reviewed", width: 10 },
      { header: "Paid Out of Pocket", key: "out_of_pocket", width: 10 },
      { header: "Check Sent", key: "paid", width: 10 },
      { header: "Date Entered", key: "date", width: 10 },
      { header: "Reciept Link", key: "recieptLink", width: 10 },
    ];

    transactionsData.forEach((transaction) => {
      if (transaction.out_of_pocket) {
        if (transaction.paid) {
          transaction.paid = "Check Sent";
        } else {
          transaction.paid = "Check Not Sent";
        }
      } else {
        transaction.paid = "N/A"
      }
      if (transaction.out_of_pocket) {
          transaction.out_of_pocket = "Reimbursement Needed";
      } else {
        transaction.out_of_pocket = "No Action Necessary";
      }
      if (transaction.reviewed) {
        transaction.reviewed = "Reviewed";
      } else {
        transaction.reviewed = "Not Reviewed";
      }
      
      worksheet.addRow({ ...transaction });
    });

    worksheet.getRow(1).font = { bold: true };

    // Write the workbook directly to the response stream
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Transactions_Data.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Important: Pipe the workbook stream directly to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting data to Excel:", error);
    res.status(500).send("Failed to export data to Excel");
  }
});

module.exports = router;
