/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Table, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { css } from "@emotion/react";
import { jsPDF } from "jspdf";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import ExportExcelButton from "../../ExcelExport/ExcelExport";

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

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [locations, setLocations] = useState([]);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    document.title = "Admin Dashboard";
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/application");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchApplications();
  }, []);

  const generatePdfContent = (doc, request, locations) => {
    let yPosition = 10;
    const lineHeight = 10;
    const leftMargin = 10;
  
    const primaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_primary
    )?.name_of_Location;
  
    const secondaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_secondary
    )?.name_of_Location;
  
    const preferredSpace = Array.isArray(request.preferred_space)
      ? request.preferred_space.join(", ")
      : request.preferred_space;
  
    doc.setFontSize(16);
    doc.text("West Fargo Public Schools", leftMargin, yPosition);
    yPosition += lineHeight * 2;
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Rental Application Summary", leftMargin, yPosition);
    yPosition += lineHeight * 1.5;
  
    const fields = [
      ["Team/Organization/Event", request.team_org_event],
      ["Title with Team/Organization/Event", request.title_w_team_org_event],
      ["Coach/Contact Name", `${request.coach_contact_first_name || ""} ${request.coach_contact_last_name || ""}`],
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
      ["Renter Name", `${request.renter_first_name || ""} ${request.renter_last_name || ""}`],
      ["Renter Address", request.renter_street_address],
      ["Renter City", request.renter_city],
      ["Renter State", request.renter_state],
      ["Renter ZIP", request.renter_zip],
      ["Renter Phone", request.renter_phone],
      ["Renter Email", request.renter_email],
      ["Special Requests", request.special_requests],
      ["Rented Previously", request.rented_previously ? "Yes" : "No"],
      ["Respectful Use of Space Agreement", request.agree_to_respectful_use_of_space ? "Yes" : "No"],
      ["Invoice Payment Agreement", request.agree_to_invoice_payment_process ? "Yes" : "No"],
    ];
  
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    fields.forEach(([label, value]) => {
      if (value && value !== "N/A" && value !== undefined) {
        doc.text(`${label}:`, leftMargin, yPosition);
        doc.setFont("helvetica", "bold");
        doc.text(`${value}`, leftMargin + 80, yPosition, { align: "left" });
        doc.setFont("helvetica", "normal");
        yPosition += lineHeight;
  
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      }
    });
  };

  const handleDownload = (request) => {
    console.log(request);
    const doc = new jsPDF();
    generatePdfContent(doc, request, locations);;
    doc.save("AdminDataView.pdf");
  };

  const calculateStats = (request) => {
    const totalRequests = request.length;

    const locationUsage = request.reduce((acc, req) => {
      acc[req.preferred_location_primary] =
        (acc[req.preferred_location_primary] || 0) + 1;
      return acc;
    }, {});

    const mostRentedLocationId = Object.keys(locationUsage).reduce((a, b) =>
      locationUsage[a] > locationUsage[b] ? a : b
    );

    const mostRentedLocation = locations.find(
      (loc) => loc.id === parseInt(mostRentedLocationId)
    )?.name_of_Location;

    const spaceUsage = request.reduce((acc, req) => {
      const spaces = req.preferred_space.split(", ");
      spaces.forEach((space) => {
        acc[space] = (acc[space] || 0) + 1;
      });
      return acc;
    }, {});

    const mostPopularSpace = Object.keys(spaceUsage).reduce((a, b) =>
      spaceUsage[a] > spaceUsage[b] ? a : b
    );

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

  // const stats = calculateStats();

  const renderField = (label, value) => (
    <Col xs={12} md={6} className="mb-3">
      <span css={labelStyle}>{label}: </span>
      <span css={fieldValueStyle}>{value || "N/A"}</span>
    </Col>
  );

  return (
    <>
      <Container>
        <h1 css={headerStyle}>Admin Dashboard</h1>
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
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>Click to view full details of this request.</Tooltip>
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
