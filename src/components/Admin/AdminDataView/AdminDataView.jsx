import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function AdminDataView() {
  const [heading, setHeading] = useState("Admin Data View");
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
    generatePdfContent(doc);
    doc.save("AdminDataView.pdf");
  };

  const handleSendByEmail = async () => {
    const doc = new jsPDF();
    generatePdfContent(doc);
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

  return (
    <Container fluid>
      <h2>{heading}</h2>
      <Row>
        {Object.keys(request).map((key, index) => (
          <Col xs={6} md={4} key={index}>
            <strong>{key.replace(/_/g, " ")}:</strong> {request[key] || "N/A"}
          </Col>
        ))}
      </Row>
      <Button className="mt-3" onClick={handleDownload}>
        Download PDF
      </Button>{" "}
      <Button className="mt-3" onClick={handleSendByEmail}>
        Send by Email
      </Button>
    </Container>
  );
}

export default AdminDataView;
