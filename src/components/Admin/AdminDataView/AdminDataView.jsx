/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { css } from "@emotion/react";
import ExportExcelButton from "../../ExcelExport/ExcelExport";

const headingStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2.5rem;
  color: #2c3e50;
`;

const cardStyle = css`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const sectionTitleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #34495e;
`;

const labelStyle = css`
  font-weight: bold;
  color: #2c3e50;
`;

const fieldValueStyle = css`
  color: #34495e;
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

const AdminDataView = () => {
  const [heading] = useState("Admin Data View");
  const [request, setRequest] = useState({});
  const [locations, setLocations] = useState([]);
  const location = useLocation();
  const requestID = new URLSearchParams(location.search).get("requestID");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/application/${requestID}`);
        setRequest(response.data[0]);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchRequest();
  }, [requestID]);

  const generatePdfContent = (doc) => {
    let yPosition = 10;
    const lineHeight = 10;

    doc.text(heading, 10, yPosition);
    yPosition += lineHeight;

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
      ["Preferred Location", request.preferred_location_primary],
      ["Preferred Space", request.preferred_space],
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

    fields.forEach(([label, value]) => {
      doc.text(`${label}: ${value || "N/A"}`, 10, yPosition);
      yPosition += lineHeight;
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    Object.entries(request).forEach(([key, value], index) => {
      doc.text(`${key.replace(/_/g, " ")}: ${value || "N/A"}`, 10, 20 + index * 10);
    });
    doc.save("AdminDataView.pdf");
  };

  const handleSendByEmail = async () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    Object.entries(request).forEach(([key, value], index) => {
      doc.text(`${key.replace(/_/g, " ")}: ${value || "N/A"}`, 10, 20 + index * 10);
    });

    const pdfBlob = doc.output("blob");

    const formData = new FormData();
    formData.append("pdf", pdfBlob, "AdminDataView.pdf");

    try {
      await axios.post("/send-email", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  const renderField = (label, value) => (
    <Col xs={12} md={6} className="mb-3">
      <span css={labelStyle}>{label}: </span>
      <span css={fieldValueStyle}>{value || "N/A"}</span>
    </Col>
  );

  const primaryLocation = locations.find(
    (loc) => loc.id === request.preferred_location_primary
  )?.name_of_Location;

  const secondaryLocation = locations.find(
    (loc) => loc.id === request.preferred_location_secondary
  )?.name_of_Location;

  return (
    <Container fluid>
      <h2 css={headingStyle}>{heading}</h2>
      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Team / Event Details</h3>
        <Row>
          {renderField("Team / Organization / Event", request.team_org_event)}
          {renderField("Title with Team / Organization / Event", request.title_w_team_org_event)}
          {renderField(
            "Coach's Name",
            `${request.coach_contact_first_name || ""} ${request.coach_contact_last_name || ""}`
          )}
          {renderField("Coach's Email", request.coach_contact_email)}
          {renderField("Coach's Phone", request.coach_contact_phone)}
          {renderField("Website", request.website)}
        </Row>
      </Card>

      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Event Details</h3>
        <Row>
          {renderField("Event Description", request.event_description)}
          {renderField("Event Type", request.event_type)}
          {renderField("Preferred Timeframe", request.preferred_time)}
          {renderField("Expected Attendance", `${request.expected_attendance || "0"} people`)}
          {renderField("Preferred Days", request.preferred_days)}
          {renderField("Start Date", request.start_date)}
          {renderField("End Date", request.end_date)}
          {renderField("Additional Dates", request.additional_dates)}
        </Row>
      </Card>

      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Location Preferences</h3>
        <Row>
          {renderField("Preferred Location (Primary)", primaryLocation)}
          {renderField("Preferred Location (Secondary)", secondaryLocation)}
          {renderField("Preferred Space", request.preferred_space?.slice(2, -2))}
        </Row>
      </Card>

      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Renter Details</h3>
        <Row>
          {renderField(
            "Renter's Name",
            `${request.renter_first_name || ""} ${request.renter_last_name || ""}`
          )}
          {renderField("Renter's Email", request.renter_email)}
          {renderField("Street Address", request.renter_street_address)}
          {renderField("City", request.renter_city)}
          {renderField("State", request.renter_state)}
          {renderField("ZIP Code", request.renter_zip)}
          {renderField("Phone", request.renter_phone)}
          {renderField("Rented Previously", request.rented_previously ? "Yes" : "No")}
        </Row>
      </Card>

      <div className="d-flex justify-content-center mt-4">
        <button css={buttonStyle} onClick={handleDownload} className="mx-2">
          Download PDF
        </button>
        <button css={buttonStyle} onClick={handleSendByEmail} className="mx-2">
          Send by Email
        </button>
        <ExportExcelButton />
      </div>
    </Container>
  );
};

export default AdminDataView;
