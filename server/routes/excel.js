const express = require("express");
const ExcelJS = require("exceljs");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/export", async (req, res) => {
  try {
    const queryText = `SELECT * FROM "Requests" ORDER BY "id" ASC`;
    let { rows: requestData } = await pool.query(queryText);


    requestData = requestData.filter((data) => {
      // Convert data.end_date to a Date object
      const endDate = new Date(data.end_date);
      const currentDate = new Date(); // Get the current date and time
      
      // Compare the end_date to the current date
      return endDate >= currentDate;
    });

    const locationsQueryText = `SELECT * FROM "Locations" ORDER BY "id" ASC`;
    const { rows: locationsRows } = await pool.query(locationsQueryText);

    // ====== Create a new workbook and worksheets ======
    const workbook = new ExcelJS.Workbook();
    const allRequests = workbook.addWorksheet("Requests Data");

    // ====== Define allRequests columns ======
    allRequests.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "Date Submitted", key: "date_submitted", width: 10 },
      { header: "Reviewed (at/by)", key: "reviewed", width: 5 },
      { header: "Team/Organization/Event", key: "team_org_event", width: 10 },
      { header: "Coach/ Contact Title within Team/Organization/Event", key: "title_w_team_org_event", width: 10 },
      { header: "Coach/ Contact First Name", key: "coach_contact_first_name", width: 10 },
      { header: "Coach/ Contact Last Name", key: "coach_contact_last_name", width: 10 },
      { header: "Coach/ Contact Email", key: "coach_contact_email", width: 25 },
      { header: "Coach/ Contact Phone", key: "coach_contact_phone", width: 15 },
      { header: "Website", key: "website", width: 30 },
      { header: "Event Type", key: "event_type", width: 15 },
      { header: "Preferred Days of the Week", key: "preferred_days", width: 10 },
      { header: "Preferred Time", key: "preferred_time", width: 20 },
      { header: "Primary Location", key: "preferred_location_primary", width: 20 },
      { header: "Secondary Location", key: "preferred_location_secondary", width: 20 },
      { header: "Preferred Space", key: "preferred_space", width: 20 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Start Date", key: "start_date", width: 15 },
      { header: "End Date", key: "end_date", width: 15 },
      { header: "Start Date", key: "additional_dates", width: 15 },
      { header: "Expected Attendance", key: "expected_attendance", width: 10 },
      { header: "85% WF Students", key: "WF_students", width: 15 },
      { header: "Grade Level", key: "grade_level", width: 15 },
      { header: "PDF Cloudinary link to Team Roster", key: "team_pdf", width: 20 },
      { header: "Rented Previously", key: "rented_previously", width: 10 },
      { header: "Renter's First Name", key: "renter_first_name", width: 10 },
      { header: "Renter's Last Name", key: "renter_last_name", width: 10 },
      { header: "Renter's Street Address", key: "renter_street_address", width: 20 },
      { header: "Renter's City", key: "renter_city", width: 10 },
      { header: "Renter's State", key: "renter_state", width: 10 },
      { header: "Renter's ZIP code", key: "renter_zip", width: 7 },
      { header: "Renter's Phone #", key: "renter_phone", width: 20 },
      { header: "Renter's Email", key: "renter_email", width: 20 },
    ];
    let count = 2;
    requestData.forEach((request) => {
      let req = {...request, reviewed: "no"};
      if (req.preferred_time === '6:00 PM') {
        req.preferred_time = '6:00PM - 7:00PM';
      } else if (req.preferred_time === '7:00 PM') {
        req.preferred_time = '7:00PM - 8:00PM';
      } else if (req.preferred_time === '8:00 PM') {
        req.preferred_time = '8:00PM - 9:00PM';
      } else if (req.preferred_time === '9:00 PM') {
        req.preferred_time = '9:00PM - 10:00PM';
      }
      for (const location of locationsRows) {
        if (location.id === req.preferred_location_primary) {
          req.preferred_location_primary = location.name_of_Location
        } else if (location.id === req.preferred_location_secondary) {
          req.preferred_location_secondary = location.name_of_Location;
        }
      }
      if (req.WF_students) {
        req.WF_students = "Yes";
      } else {
        req.WF_students = "No";
      }
      if (req.rented_previously) {
        req.rented_previously = "Yes";
      } else {
        req.rented_previously = "No";
      }
      allRequests.addRow(req);
      if (req.priority === "Days") {
        allRequests.getRow(count).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffe2efd9' } }});
      } else if (req.priority === "Time") {
        allRequests.getRow(count).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffdeeaf6' } }});
      } else if (req.priority === "Location") {
        allRequests.getRow(count).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'fffef2cb' } }});
      }
      count++;
    });

    allRequests.getRow(1).font = { bold: true };

  //===================================================Seperator Between Sheets=============================================================
    let collection = []
    for (let i=1; i <= 12; i++) {
      if (i === 1){
        mon = 'Jan'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '01' || request.end_date.slice(5, 7) === '01');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 2){
        mon = 'Feb'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '02' || request.end_date.slice(5, 7) === '02');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 3){
        mon = 'Mar'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '03' || request.end_date.slice(5, 7) === '03');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 4){
        mon = 'Apr'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '04' || request.end_date.slice(5, 7) === '04');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 5){
        mon = 'May'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '05' || request.end_date.slice(5, 7) === '05');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 6){
        mon = 'Jun'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '06' || request.end_date.slice(5, 7) === '06');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 7){
        mon = 'Jul'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '07' || request.end_date.slice(5, 7) === '07');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 8){
        mon = 'Aug'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '08' || request.end_date.slice(5, 7) === '08');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 9){
        mon = 'Sep'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '09' || request.end_date.slice(5, 7) === '09');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 10){
        mon = 'Oct'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '10' || request.end_date.slice(5, 7) === '10');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 11){
        mon = 'Nov'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '11' || request.end_date.slice(5, 7) === '11');
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      } else if (i === 12){
        mon = 'Dec'
        collection = requestData.filter((request) => request.start_date.slice(5, 7) === '12' || request.end_date.slice(5, 7) === '12');
        for(let item of collection) {
          if(item.excel === 'used') {
            item.excel = "unused";
          }
        }
        if (collection.length > 0) {
          buildGymSheet(collection, mon);
        }
      }
    }

    function buildGymSheet(collection, mon) {
      const worksheet = workbook.addWorksheet(`Gymnasium Requests (${mon})`);

      // ====== Define worksheet columns ======
      worksheet.columns = [
        { header: "", key: "col0", width: 30 },
        { header: "Aurora ES", key: "col1", width: 30 },
        { header: "Brooks Harbor ES", key: "col2", width: 30 },
        { header: "Deer Creek ES", key: "col3", width: 30 },
        { header: "Eastwood ES", key: "col4", width: 30 },
        { header: "Freedom ES", key: "col5", width: 30 },
        { header: "Harwood ES", key: "col6", width: 30 },
        { header: "Horace ES", key: "col7", width: 30 },
        { header: "Independence ES", key: "col8", width: 30 },
        { header: "L.E. Berger ES", key: "col9", width: 30 },
        { header: "Legacy ES", key: "col10", width: 30 },
        { header: "Meadowlark ES", key: "col11", width: 30 },
        { header: "Osgood ES", key: "col12", width: 30 },
        { header: "South ES", key: "col13", width: 30 },
        { header: "Westside ES", key: "col14", width: 30 },
        { header: "Willow Park ES", key: "col15", width: 30 },
      ];

      for (let i=1; i<39; i++) {
        prepareData(i, collection, worksheet, locationsRows);
      }

      worksheet.addRow({ col0: ''});
      worksheet.addRow({ col0: ''});
      worksheet.addRow({ col0: 'Requests that had too many conflicts, or simply struggled to get fit into the schedule:', col1: "Preferred Day(s) of the week", col2: "Preferred start time", col3: "Preferred location (primary)", col4: "Preferred location (secondary)", col5: "What the user wanted prioritized"});
      let leftovers = collection.filter((request) => request.excel === 'unused');
      for (const leftover of leftovers) {
        let location1 = '';
        let location2 = '';
        for (const location of locationsRows) {
          if (location.id === leftover.preferred_location_primary) {
            location1 = location.name_of_Location
          } else if (location.id === leftover.preferred_location_secondary) {
            location2 = location.name_of_Location;
          }
        }
        worksheet.addRow({ col0: `${leftover.team_org_event} (${leftover.coach_contact_first_name} ${leftover.coach_contact_last_name[0]}) d`, col1: leftover.preferred_days, col2: leftover.preferred_time, col3: location1, col4: location2, col5: leftover.priority});
      }

      worksheet.views = [{ state: 'frozen', ySplit: 1 }];
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(2).font = { bold: true };
      worksheet.getRow(3).font = { bold: true };
      worksheet.getRow(3).font = { bold: true };
      worksheet.getRow(3).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(7).font = { bold: true };
      worksheet.getRow(7).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(11).font = { bold: true };
      worksheet.getRow(11).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(15).font = { bold: true };
      worksheet.getRow(15).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(19).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } }});
      worksheet.getRow(20).font = { bold: true };
      worksheet.getRow(22).font = { bold: true };
      worksheet.getRow(22).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(25).font = { bold: true };
      worksheet.getRow(25).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(28).font = { bold: true };
      worksheet.getRow(28).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getRow(31).font = { bold: true };
      worksheet.getRow(31).eachCell((cell, colNumber) => { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffd8d8d8' } }});
      worksheet.getCell('A36').style.fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: 'fffef2cb' }};
      worksheet.getCell('A37').style.fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffdeeaf6' }};
      worksheet.getCell('A38').style.fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffe2efd9' }};
      worksheet.getCell('A39').style.fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: 'fff9b9ed' }};



      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          if (cell.value.charAt(cell.value.length - 1) === 'l' && cell.value.charAt(cell.value.length - 2) === ' ') {
            // Set the background color to yellow for priority "location"
            cell.style.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'fffef2cb' }  // Yellow
            };
          } else if (cell.value.charAt(cell.value.length - 1) === 'd' && cell.value.charAt(cell.value.length - 2) === ' ') {
            // Set the background color to green for priority "day"
            cell.style.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffe2efd9' }  // green
            };
          } else if (cell.value.charAt(cell.value.length - 1) === 't' && cell.value.charAt(cell.value.length - 2) === ' ') {
            // Set the background color to blue for priority "time"
            cell.style.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffdeeaf6' }  // blue
            };
          }
        });
      });

      // Define the border style (all borders)
      const borderStyle = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      // Iterate through all rows and cells, and apply borders
      worksheet.eachRow((row, rowIndex) => {
        row.eachCell((cell, colIndex) => {
          cell.border = borderStyle; // Apply the border to each cell
        });
      });
    }

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




  function prepareData(row, data, worksheet, locations) {
    if(row === 1) {
      worksheet.addRow({ col9: '*No Volleyball', col11: 'NEW', col12: '*No Voleyball', col14: '*No Volleyball'});
    } else if (row === 2) {
      worksheet.addRow({ col0: 'Monday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 3) {
      let day = 'Mondays';
      let time = '6:00 PM';
      worksheet.addRow({ col0: '6:00PM - 7:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 4) {
      let day = 'Mondays';
      let time = '7:00 PM';
      worksheet.addRow({ col0: '7:00PM - 8:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 5) {
      let day = 'Mondays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 6) {
      worksheet.addRow({ col0: 'Tuesday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 7) {
      let day = 'Tuesdays';
      let time = '6:00 PM';
      worksheet.addRow({ col0: '6:00PM - 7:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 8) {
      let day = 'Tuesdays';
      let time = '7:00 PM';
      worksheet.addRow({ col0: '7:00PM - 8:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 9) {
      let day = 'Tuesdays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 10) {
      worksheet.addRow({ col0: 'Thursday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 11) {
      let day = 'Thursdays';
      let time = '6:00 PM';
      worksheet.addRow({ col0: '6:00PM - 7:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 12) {
      let day = 'Thursdays';
      let time = '7:00 PM';
      worksheet.addRow({ col0: '7:00PM - 8:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 13) {
      let day = 'Thursdays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 14) {
      worksheet.addRow({ col0: 'Friday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 15) {
      let day = 'Fridays';
      let time = '6:00 PM';
      worksheet.addRow({ col0: '6:00PM - 7:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 16) {
      let day = 'Fridays';
      let time = '7:00 PM';
      worksheet.addRow({ col0: '7:00PM - 8:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 17) {
      let day = 'Fridays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day), col9: prioritize(data, 9, row, locations, time, day), col10: prioritize(data, 10, row, locations, time, day), col11: prioritize(data, 11, row, locations, time, day), col12: prioritize(data, 12, row, locations, time, day), col13: prioritize(data, 13, row, locations, time, day), col14: prioritize(data, 14, row, locations, time, day), col15: prioritize(data, 15, row, locations, time, day) });
    } else if (row === 18) {
      worksheet.addRow({ col0: '', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 19) {
      worksheet.addRow({ col1: 'CMS North Court', col2: 'CMS Middle Court', col3: 'CMS South Court', col4: 'HMS Court 1', col5: 'HMS Court 2', col6: 'LMS Court 1', col7: 'LMS Court 2', col8: 'LMS Court 3 (AUX)' });
    } else if (row === 20) {
      worksheet.addRow({ col1: 'only 2 official stand for volleyball @ Cheney'});
    } else if (row === 21) {
      worksheet.addRow({ col0: 'Monday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 22) {
      let day = 'Mondays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 23) {
      let day = 'Mondays';
      let time = '9:00 PM';
      worksheet.addRow({ col0: '9:00PM - 10:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 24) {
      worksheet.addRow({ col0: 'Tuesday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 25) {
      let day = 'Tuesdays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 26) {
      let day = 'Tuesdays';
      let time = '9:00 PM';
      worksheet.addRow({ col0: '9:00PM - 10:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 27) {
      worksheet.addRow({ col0: 'Thursday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 28) {
      let day = 'Thursdays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 29) {
      let day = 'Thursdays';
      let time = '9:00 PM';
      worksheet.addRow({ col0: '9:00PM - 10:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 30) {
      worksheet.addRow({ col0: 'Friday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 31) {
      let day = 'Fridays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 32) {
      let day = 'Fridays';
      let time = '9:00 PM';
      worksheet.addRow({ col0: '9:00PM - 10:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 33) {
      worksheet.addRow({ col0: ''});
    } else if (row === 34) {
      worksheet.addRow({ col0: ''});
    } else if (row === 35) {
      worksheet.addRow({ col0: '', col1: 'Location'});
    } else if (row === 36) {
      worksheet.addRow({ col0: '', col1: 'Time'});
    } else if (row === 37) {
      worksheet.addRow({ col0: '', col1: 'Days'});
    } else if (row === 38) {
      worksheet.addRow({ col0: '', col1: 'Volt Volleyball'});
    }
    return;
  };
  
  function prioritize(data, colNum, rowNum, locationsList, time, day) {
    // First we organize the various locations to make it easier to compare to.
    let locations = [];
    for (let loc of locationsList) {
      locations.push(loc);
    }
    for (let x=12; x>=2; x-=5) {
      let location = locations.splice(x, 1)[0];
      locations.push(location);
    }
    let midSch = 0
    if (rowNum > 19) {
      if(colNum === 1 || colNum === 2 || colNum === 3) {
        midSch = 1;
      } else if (colNum === 4 || colNum === 5) {
        midSch = 2;
      } else if (colNum === 6 || colNum === 7 || colNum === 8) {
        midSch = 3;
      }
    }

    for (let i=1; i<=9; i++) {
      let availableOptions = []; // will be used to store the available options along the way, will be progressively filtered down along the way
      availableOptions = data.filter((val) => val.excel !== 'used'); // first, filter out any requests that have been used
      availableOptions = availableOptions.filter((val) => val.preferred_space.includes("Gymnasium")); // second we filter out any requests that don't occur in a gymnasium
      

      if(i === 1 || i === 4 || i === 7) {
        // filtering based on prioritizing location
        if(i !== 7) {
          availableOptions = availableOptions.filter((val) => val.priority === 'Location');
        }
        if (rowNum < 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[colNum-1].id || val.preferred_location_secondary === locations[colNum-1].id);
        } else if (rowNum > 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[locations.length - midSch].id || val.preferred_location_secondary === locations[locations.length - midSch].id);
        }

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_time === time);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_days === day);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        // here we check what the oldest request within the given parameters is
        if(i === 4 || i === 7) {
          let oldest = Number.MAX_VALUE;
          for (let option of availableOptions) {
            if (option.id < oldest) {
              oldest = option.id;
            }
          }
          for (let request of data) {
            if(oldest === request.id && availableOptions[0].preferred_time === time && availableOptions[0].preferred_days === day) {
              request.excel = 'used';
              return `${request.team_org_event} (${request.coach_contact_first_name} ${request.coach_contact_last_name[0]}) l`;
            }
          }
        }
      } else if(i === 2 || i === 5 || i === 8) {
        // filtering based on prioritizing day of the week
        if (i !== 8) {
          availableOptions = availableOptions.filter((val) => val.priority === 'Days');
        }
        availableOptions = availableOptions.filter((val) => val.preferred_days === day);
        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_time === time);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        if (rowNum < 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[colNum-1].id || val.preferred_location_secondary === locations[colNum-1].id);
        } else if (rowNum > 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[locations.length - midSch].id || val.preferred_location_secondary === locations[locations.length - midSch].id);
        }

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        // here we check what the oldest request within the given parameters is
        if(i === 5 || i === 8) {
          let oldest = Number.MAX_VALUE;
          for (let option of availableOptions) {
            if (option.id < oldest) {
              oldest = option.id;
            }
          }
          for (let request of data) {
            if(rowNum < 19) {
              if(oldest === request.id) {
                if(request.preferred_time === time && (request.preferred_location_primary === locations[colNum-1].id || request.preferred_location_secondary === locations[colNum-1].id )) {
                  request.excel = 'used';
                  return `${request.team_org_event} (${request.coach_contact_first_name} ${request.coach_contact_last_name[0]}) d`;
                }
              }
            } else if (rowNum > 19) {
              if(oldest === request.id) {
                if(request.preferred_time === time && (request.preferred_location_primary === locations[locations.length - midSch].id || request.preferred_location_secondary === locations[locations.length - midSch].id) )
                request.excel = 'used';
                return `${request.team_org_event} (${request.coach_contact_first_name} ${request.coach_contact_last_name[0]}) d`;
              }
            }
          }
        }
      } else if(i === 3 || i === 6 || i === 9) {
        // filtering based on prioritizing time of day
        if(i !== 9) {
          availableOptions = availableOptions.filter((val) => val.priority === 'Time');
        }
        availableOptions = availableOptions.filter((val) => val.preferred_time === time);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_days === day);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        if (rowNum < 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[colNum-1].id || val.preferred_location_secondary === locations[colNum-1].id);
        } else if (rowNum > 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[locations.length - midSch].id || val.preferred_location_secondary === locations[locations.length - midSch].id);
        }

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day, rowNum)) {return reply};
        };

        // here we check what the oldest request within the given parameters is
        if(i === 6 || i === 9) {
          let oldest = Number.MAX_VALUE;
          for (let option of availableOptions) {
            if (option.id < oldest) {
              oldest = option.id;
            }
          }
          for (let request of data) {
            if(oldest === request.id && availableOptions[0].preferred_days === day && (availableOptions[0].preferred_location_primary === locations[colNum-1].id || availableOptions[0].preferred_location_secondary === locations[colNum-1].id || availableOptions[0].preferred_location_primary === locations[locations.length - midSch].id || availableOptions[0].preferred_location_secondary === locations[locations.length - midSch].id)) {
              request.excel = 'used';
              return `${request.team_org_event} (${request.coach_contact_first_name} ${request.coach_contact_last_name[0]}) t`;
            }
          }
        }
      }
    }
  }

  function checkForOne(availableOption, data, type, time, colNum, locations, midSch, day, rowNum) {
    if (type == 'Days') {
      for (let request of data) {
        if(rowNum < 19) {
          if(availableOption.id === request.id  && availableOption.preferred_time === time && (availableOption.preferred_location_primary === locations[colNum-1].id || availableOption.preferred_location_secondary === locations[colNum-1].id)) {
            request.excel = 'used';
            return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) d`;
          }
        } else if (rowNum > 19) {
          if(availableOption.id === request.id && availableOption.preferred_time === time && (availableOption.preferred_location_primary === locations[locations.length - midSch].id || availableOption.preferred_location_secondary === locations[locations.length - midSch].id) ) {
            request.excel = 'used';
            return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) d`;
          }
        }
      }
    } else if (type === 'Time') {
      for (let request of data) {
        if(rowNum < 19) {
          if(availableOption.id === request.id && availableOption.preferred_days === day && (availableOption.preferred_location_primary === locations[colNum-1].id || availableOption.preferred_location_secondary === locations[colNum-1].id)) {
            request.excel = 'used';
            return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) t`;
          }
        } else if (rowNum > 19) {
          if(availableOption.id === request.id && availableOption.preferred_days === day && (availableOption.preferred_location_primary === locations[locations.length - midSch].id || availableOption.preferred_location_secondary === locations[locations.length - midSch].id)) {
            request.excel = 'used';
            return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) t`;
          }
        }
      }
    } else if (type === 'Location') {
      for (let request of data) {
        if(availableOption.id === request.id && availableOption.preferred_time === time && availableOption.preferred_days === day) {
          request.excel = 'used';
          return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) l`;
        }
      }
    }
    return false;
  }
});

module.exports = router;
