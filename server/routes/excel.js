const express = require("express");
const ExcelJS = require("exceljs");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/export", async (req, res) => {
  try {
    const queryText = `SELECT * FROM "Requests" ORDER BY "id" DESC`;
    const { rows: requestData } = await pool.query(queryText);

    const locationsQueryText = `SELECT * FROM "Locations" ORDER BY "id" ASC`;
    const { rows: locationsRows } = await pool.query(locationsQueryText);

    // ====== Create a new workbook and worksheet ======
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Requests Data");

    // ====== Define worksheet columns ======
    worksheet.columns = [
      { header: "", key: "col0", width: 20 },
      { header: "Aurora ES", key: "col1", width: 20 },
      { header: "Brooks Harbor ES", key: "col2", width: 20 },
      { header: "Deer Creek ES", key: "col3", width: 20 },
      { header: "Eastwood ES", key: "col4", width: 20 },
      { header: "Freedom ES", key: "col5", width: 20 },
      { header: "Harwood ES", key: "col6", width: 20 },
      { header: "Horace ES", key: "col7", width: 20 },
      { header: "Independence ES", key: "col8", width: 20 },
      { header: "L.E. Berger ES", key: "col9", width: 20 },
      { header: "Legacy ES", key: "col10", width: 20 },
      { header: "Meadowlark ES", key: "col11", width: 20 },
      { header: "Osgood ES", key: "col12", width: 20 },
      { header: "South ES", key: "col13", width: 20 },
      { header: "Westside ES", key: "col14", width: 20 },
      { header: "Willow Park ES", key: "col15", width: 20 },
    ];

    // requestData.forEach((request) => {
    //   worksheet.addRow(request);
    // });

    for (let i=1; i<39; i++) {
      prepareData(i, requestData, worksheet, locationsRows);
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
      worksheet.addRow({ col1: 'Cheney Middle School North Court', col2: 'Cheney Middle School Middle Court', col3: 'Cheney Middle School South Court', col4: 'Heritage Middle School Court 1', col5: 'Heritage Middle School Court 2', col6: 'Liberty Middle School Court 1', col7: 'Liberty Middle School Court 2', col8: 'Liberty Middle School Court 3 (AUX)' });
    } 
    
    else if (row === 21) {
      worksheet.addRow({ col0: 'Monday', col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '', col11: '', col12: '', col13: '', col14: '', col15: ''});
    } else if (row === 22) {
      let day = 'Mondays';
      let time = '8:00 PM';
      worksheet.addRow({ col0: '8:00PM - 9:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
    } else if (row === 23) {
      let day = 'Mondays';
      let time = '9:00 PM';
      worksheet.addRow({ col0: '9:00PM - 10:00PM', col1: prioritize(data, 1, row, locations, time, day), col2: prioritize(data, 2, row, locations, time, day), col3: prioritize(data, 3, row, locations, time, day), col4: prioritize(data, 4, row, locations, time, day), col5: prioritize(data, 5, row, locations, time, day), col6: prioritize(data, 6, row, locations, time, day), col7: prioritize(data, 7, row, locations, time, day), col8: prioritize(data, 8, row, locations, time, day) });
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
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_time === time);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_days === day);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Location', time, colNum, locations, midSch, day)) {return reply};
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
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_time === time);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day)) {return reply};
        };

        if (rowNum < 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[colNum-1].id || val.preferred_location_secondary === locations[colNum-1].id);
        } else if (rowNum > 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[locations.length - midSch].id || val.preferred_location_secondary === locations[locations.length - midSch].id);
        }

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Days', time, colNum, locations, midSch, day)) {return reply};
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
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day)) {return reply};
        };

        availableOptions = availableOptions.filter((val) => val.preferred_days === day);

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day)) {return reply};
        };

        if (rowNum < 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[colNum-1].id || val.preferred_location_secondary === locations[colNum-1].id);
        } else if (rowNum > 19) {
          availableOptions = availableOptions.filter((val) => val.preferred_location_primary === locations[locations.length - midSch].id || val.preferred_location_secondary === locations[locations.length - midSch].id);
        }

        // check if there is only one option left
        if(availableOptions.length === 1) {
          if(reply = checkForOne(availableOptions[0], data, 'Time', time, colNum, locations, midSch, day)) {return reply};
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

  function checkForOne(availableOption, data, type, time, colNum, locations, midSch, day) {
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
          return `${availableOption.team_org_event} (${availableOption.coach_contact_first_name} ${availableOption.coach_contact_last_name[0]}) t`;
        }
      }
    }
    return false;
  }
});

module.exports = router;
