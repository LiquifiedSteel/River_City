/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import axios for making HTTP requests
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { Container, Table, Card } from "react-bootstrap"; // Import Bootstrap components
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Import useHistory for navigation
import { css } from "@emotion/react"; // Import css from emotion for styling
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import Tooltip from "react-bootstrap/Tooltip"; // Import Tooltip from Bootstrap
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; // Import OverlayTrigger for tooltips

import ExportExcelButton from "../../ExcelExport/ExcelExport"; // Import custom Excel export button

// Define Emotion CSS styles for various elements
const headerStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2rem;
`;

const infoStyle = css`
  margin: 20px 5vw;
  font-size: 1rem;
  background-color: lightgray;
  color: black;
  padding: 1rem;
  border-radius: 8px;
`;

const tableStyle = css`
  margin-top: 20px;

  th {
    background-color: #205831;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
  }

  td {
    text-align: center;
    vertical-align: middle;
  }
`;

const customButtonStyle = css`
  padding: 5px 15px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &.view {
    background-color: #17a2b8;
    color: #fff;
  }

  &.view:hover {
    background-color: #138496;
  }

  &.edit {
    background-color: #ffc107;
    color: #212529;
  }

  &.edit:hover {
    background-color: #e0a800;
  }
`;

const buttonStyle = css`
  background-color: #3498db;
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

// Main AdminDashboard component
function AdminDashboard() {
  // State to hold applications and locations data
  const [applications, setApplications] = useState([]);
  const [locations, setLocations] = useState([]);

  // Access user data from Redux store
  const user = useSelector((store) => store.user);

  // Hook to handle navigation
  const history = useHistory();

  // useEffect to fetch data on component mount
  useEffect(() => {
    document.title = "Admin Dashboard"; // Set the document title

    // Async function to fetch applications and locations
    const fetchApplications = async () => {
      try {
        // Fetch applications data
        const response = await axios.get("/api/application");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      try {
        // Fetch locations data
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchApplications(); // Invoke the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  /**
   * Function to generate PDF content for a given request
   * @param {jsPDF} doc - jsPDF instance
   * @param {Object} request - Application request data
   * @param {Array} locations - List of locations
   */
  const generatePdfContent = (doc, request, locations) => {
    let yPosition = 10; // Starting Y position on the PDF
    const lineHeight = 10; // Height between lines
    const leftMargin = 10; // Left margin

    // Find primary and secondary location names based on IDs
    const primaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_primary
    )?.name_of_Location;

    const secondaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_secondary
    )?.name_of_Location;

    // Handle preferred space, which could be an array
    const preferredSpace = Array.isArray(request.preferred_space)
      ? request.preferred_space.join(", ")
      : request.preferred_space;

    // Add header to PDF
    doc.setFontSize(16);
    doc.text("West Fargo Public Schools", leftMargin, yPosition);
    yPosition += lineHeight * 2;

    // Add sub-header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Rental Application Summary", leftMargin, yPosition);
    yPosition += lineHeight * 1.5;

    // Define fields to include in PDF
    const fields = [
      ["Team/Organization/Event", request.team_org_event],
      ["Title with Team/Organization/Event", request.title_w_team_org_event],
      [
        "Coach/Contact Name",
        `${request.coach_contact_first_name || ""} ${
          request.coach_contact_last_name || ""
        }`,
      ],
      ["Coach/Contact Email", request.coach_contact_email],
      ["Coach/Contact Phone", request.coach_contact_phone],
      ["Website", request.website],
      ["Event Type", request.event_type],
      ["Preferred Time", request.preferred_time],
      ["Preferred Location (Primary)", primaryLocation],
      ["Preferred Location (Secondary)", secondaryLocation],
      ["Preferred Space", preferredSpace],
      ["Priority", request.priority],
      ["Event Description", request.event_description],
      ["Expected Attendance", request.expected_attendance],
      ["Preferred Days", request.preferred_days],
      ["Start Date", request.start_date],
      ["End Date", request.end_date],
      ["Additional Dates", request.additional_dates],
      ["West Fargo Students?", request.wf_students ? "Yes" : "No"],
      ["Grade Level", request.grade_level],
      ["Team Roster", request.team_pdf],
      [
        "Renter Name",
        `${request.renter_first_name || ""} ${request.renter_last_name || ""}`,
      ],
      ["Renter Address", request.renter_street_address],
      ["Renter City", request.renter_city],
      ["Renter State", request.renter_state],
      ["Renter ZIP", request.renter_zip],
      ["Renter Phone", request.renter_phone],
      ["Renter Email", request.renter_email],
      ["Special Requests", request.special_requests],
      ["Rented Previously", request.rented_previously ? "Yes" : "No"],
      [
        "Respectful Use of Space Agreement",
        request.agree_to_respectful_use_of_space ? "Yes" : "No",
      ],
      [
        "Invoice Payment Agreement",
        request.agree_to_invoice_payment_process ? "Yes" : "No",
      ],
    ];

    // Add each field to the PDF
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    fields.forEach(([label, value]) => {
      if (value && value !== "N/A" && value !== undefined) {
        doc.text(`${label}:`, leftMargin, yPosition); // Add label
        doc.setFont("helvetica", "bold");
        doc.text(`${value}`, leftMargin + 80, yPosition, { align: "left" }); // Add value
        doc.setFont("helvetica", "normal");
        yPosition += lineHeight;

        // Add new page if the content exceeds the page height
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      }
    });
  };

  /**
   * Handler to download a PDF for a specific request
   * @param {Object} request - Application request data
   */
  const handleDownload = (request) => {
    console.log(request); // Log the request data (for debugging)
    const doc = new jsPDF(); // Create a new jsPDF instance
    generatePdfContent(doc, request, locations); // Generate PDF content
    doc.save("AdminDataView.pdf"); // Trigger PDF download
  };

  /**
   * Function to calculate statistics from application requests
   * @param {Array} request - List of application requests
   * @returns {Object} - Calculated statistics
   */
  const calculateStats = (request) => {
    const totalRequests = request.length; // Total number of requests

    // Calculate usage per primary location
    const locationUsage = request.reduce((acc, req) => {
      acc[req.preferred_location_primary] =
        (acc[req.preferred_location_primary] || 0) + 1;
      return acc;
    }, {});

    // Determine the most rented location ID
    const mostRentedLocationId = Object.keys(locationUsage).reduce((a, b) =>
      locationUsage[a] > locationUsage[b] ? a : b
    );

    // Find the name of the most rented location
    const mostRentedLocation = locations.find(
      (loc) => loc.id === parseInt(mostRentedLocationId)
    )?.name_of_Location;

    // Calculate usage per space type
    const spaceUsage = request.reduce((acc, req) => {
      const spaces = req.preferred_space.split(", ");
      spaces.forEach((space) => {
        acc[space] = (acc[space] || 0) + 1;
      });
      return acc;
    }, {});

    // Determine the most popular space
    const mostPopularSpace = Object.keys(spaceUsage).reduce((a, b) =>
      spaceUsage[a] > spaceUsage[b] ? a : b
    );

    // Calculate total and average attendance
    const totalAttendance = request.reduce((sum, req) => {
      return sum + (parseInt(req.expected_attendance) || 0);
    }, 0);

    const averageAttendance =
      totalRequests > 0 ? (totalAttendance / totalRequests).toFixed(2) : 0;

    return {
      totalRequests,
      mostRentedLocation: mostRentedLocation || "N/A",
      mostPopularSpace: mostPopularSpace || "N/A",
      averageAttendance,
    };
  };

  // Uncomment the following line if you want to calculate stats
  // const stats = calculateStats(applications);

  /**
   * Helper function to render a labeled field
   * @param {string} label - Label for the field
   * @param {string} value - Value of the field
   * @returns {JSX.Element} - JSX element displaying the field
   */
  const renderField = (label, value) => (
    <Col xs={12} md={6} className="mb-3">
      <span css={labelStyle}>{label}: </span>
      <span css={fieldValueStyle}>{value || "N/A"}</span>
    </Col>
  );

  return (
    <>
      <Container>
        {/* Header */}
        <h1 css={headerStyle}>Admin Dashboard</h1>

        {/* Applications Table */}
        <Table striped bordered hover css={tableStyle}>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Event Type</th>
              <th>More Information</th>
              <th>Edit</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over applications and display each in a table row */}
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.team_org_event}</td>
                <td>
                  {app.coach_contact_first_name} {app.coach_contact_last_name}
                </td>
                <td>{app.coach_contact_phone}</td>
                <td>{app.coach_contact_email}</td>
                <td>{app.event_type}</td>
                <td>
                  {/* View Button with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Click to view full details of this request.
                      </Tooltip>
                    }
                  >
                    <button
                      css={customButtonStyle}
                      className="view"
                      onClick={() =>
                        history.push(`/admin-data-view?requestID=${app.id}`)
                      }
                    >
                      View
                    </button>
                  </OverlayTrigger>
                </td>
                <td>
                  {/* Edit Button with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Click to edit the details of this request.
                      </Tooltip>
                    }
                  >
                    <button
                      css={customButtonStyle}
                      className="edit"
                      onClick={() =>
                        history.push(`/admin-form-editor?requestID=${app.id}`)
                      }
                    >
                      Edit
                    </button>
                  </OverlayTrigger>
                </td>
                <td>
                  {/* Download PDF Button with Tooltip */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Download this request as a PDF for sharing or records.
                      </Tooltip>
                    }
                  >
                    <button
                      css={buttonStyle}
                      onClick={() => handleDownload(app)}
                      className="mx-2"
                    >
                      Download PDF
                    </button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Export to Excel Button */}
        <div className="d-flex justify-content-center mt-4">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Export all request data as an Excel file for easier analysis and
                sharing.
              </Tooltip>
            }
          >
            <div>
              <ExportExcelButton />
            </div>
          </OverlayTrigger>
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
