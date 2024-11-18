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

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    doc.text(
      `Team/Organization/Event: ${request.team_org_event || "N/A"}`,
      10,
      20
    );
    doc.text(
      `Coach's Name: ${request.coach_contact_first_name || "N/A"} ${
        request.coach_contact_last_name || "N/A"
      }`,
      10,
      30
    );
    doc.text(`Coach's Email: ${request.coach_contact_email || "N/A"}`, 10, 40);
    doc.text(
      `Preferred Location: ${request.preferred_location_primary || "N/A"}`,
      10,
      50
    );
    doc.text(`Start Date: ${request.start_date || "N/A"}`, 10, 60);
    doc.text(`End Date: ${request.end_date || "N/A"}`, 10, 70);
    doc.save("AdminDataView.pdf");
  };

  const handleSendByEmail = async () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    doc.text(
      `Team/Organization/Event: ${request.team_org_event || "N/A"}`,
      10,
      20
    );
    doc.text(
      `Coach's Name: ${request.coach_contact_first_name || "N/A"} ${
        request.coach_contact_last_name || "N/A"
      }`,
      10,
      30
    );
    doc.text(`Coach's Email: ${request.coach_contact_email || "N/A"}`, 10, 40);
    doc.text(
      `Preferred Location: ${request.preferred_location_primary || "N/A"}`,
      10,
      50
    );
    doc.text(`Start Date: ${request.start_date || "N/A"}`, 10, 60);
    doc.text(`End Date: ${request.end_date || "N/A"}`, 10, 70);

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

  return !request ? null : (
    <Container fluid>
      <h2>{heading}</h2>
      <Row>
        <Col xs={6} md={4}>
          Team / Organization / Event: {request.team_org_event}
        </Col>
        <Col xs={6} md={4}>
          Title with Team/ Organization/ Event: {request.title_w_team_org_event}
        </Col>
        <Col xs={6} md={4}>
          Coach's Name: {request.coach_contact_first_name}{" "}
          {request.coach_contact_last_name}
        </Col>
        <Col xs={6} md={4}>
          Coach's Email: {request.coach_contact_email}
        </Col>
        <Col xs={6} md={4}>
          Coach's Phone #: {request.coach_contact_phone}
        </Col>
        <Col xs={6} md={4}>
          Related Website: {request.website}
        </Col>

        <Col xs={12}>Event Description: {request.event_description}</Col>

        <Col xs={6} md={4}>
          Type of Event: {request.event_type}
        </Col>
        <Col xs={6} md={4}>
          Preferred Timeframe: {request.preferred_time !== "6:00 PM" ? request.preferred_time !== "7:00 PM" ? request.preferred_time !== "8:00 PM" ? request.preferred_time !== "9:00 PM" ? "N/A": "9:00 PM - 10:00 PM" : "8:00 PM - 9:00 PM" : "7:00 PM - 8:00 PM" : "6:00 PM - 7:00 PM"}
        </Col>

        <Col xs={6} md={4}>
          Preferred Space: {!request.preferred_space ? null : request.preferred_space.slice(2, -2)}
        </Col>

        <Col xs={6}>
          Preferred Location (Primary Option):{" "}
          {locations.map(loc => {if (loc.id === request.preferred_location_primary) {
            return <span key={loc.id}>{loc.name_of_Location}</span>
          }})}
        </Col>

        <Col xs={6}>
          Preferred Location (Secondary Option):{" "}
          {locations.map(loc => {if (Number(loc.id) === Number(request.preferred_location_secondary)) {
            return <span key={loc.id}>{loc.name_of_Location}</span>
          }})}
        </Col>
        
        <Col xs={6} md={4}>
          Expected Attendance: {request.expected_attendance} {" people"}
        </Col>
        {/* <Col xs={6} md={4}>Age Group: {request.ageGroup}</Col> */}
        <Col xs={6} md={4}>
          Preferred Days: {request.preferred_days}
        </Col>
        <Col xs={6} md={4}>
          Priority: Preffered {request.priority}
        </Col>
        <Col xs={6} md={4}>
          Start Date: {request.start_date}
        </Col>
        <Col xs={6} md={4}>
          End Date: {request.end_date}
        </Col>
        <Col xs={6} md={4}>
          Additional Dates: {request.additional_dates}
        </Col>

        <Col xs={6} md={4}>85% West Fargo Students?: {request.wf_students ? "Yes" : "No"}</Col>
        <Col xs={6} md={4}>Grade Level: {request.grade_level}</Col>
        <Col xs={6} md={4}>Cloudinary Link to Roster PDF: {request.team_pdf}</Col>
        {/* <Col xs={6} md={4}>Liability  Proof: {request.liabilityProof}</Col> */}
        {/* <Col xs={6} md={4}>District Acknowledgment: {request.districtAcknowledgment}</Col>
        <Col xs={6} md={4}>Special Requests: {request.specialRequests}</Col> */}
        
        <Col xs={12}></Col>
        <br />
        <Col xs={6} md={4}>
          Renter's Name: {request.renter_first_name} {request.renter_last_name}
        </Col>

        <Col xs={6} md={4}>
          Rented Previously: {request.rented_previously ? "Yes" : "No"}
        </Col>
        <Col xs={6} md={4}>
          Renter's Street Address: {request.renter_street_address}
        </Col>

        <Col xs={6} md={4}>
          Renter's City: {request.renter_city}
        </Col>

        <Col xs={6} md={4}>
          Renter's State: {request.renter_state}
        </Col>

        <Col xs={6} md={4}>
          Renter's ZIP code: {request.renter_zip}
        </Col>

        <Col xs={6} md={4}>
          Renter's Phone #: {request.renter_phone}
        </Col>

        <Col xs={6} md={4}>
          Renter's Email: {request.renter_email}
        </Col>
        
        {/* <Col xs={6} md={4}>Frequency: {request.agreeToRespectfulUseOfSpace}</Col>
        <Col xs={6} md={4}>Frequency: {request.agreeToInvoicePaymentProcess}</Col> */}
      </Row>
      <Button onClick={handlePrint}>Download Pdf</Button>{" "}
      <Button onClick={handleSendByEmail}>Send by email</Button>
    </Container>
  );
}

export default AdminDataView;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function AdminDataView() {
  const [heading, setHeading] = useState("Admin Data View");
  const [request, setRequest] = useState({});
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
    };

    fetchRequest();
  }, [requestID]);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    doc.text(
      `Team/Organization/Event: ${request.team_org_event || "N/A"}`,
      10,
      20
    );
    doc.text(
      `Coach's Name: ${request.coach_contact_first_name || "N/A"} ${
        request.coach_contact_last_name || "N/A"
      }`,

      10,
      30
    );
    doc.text(`Coach's Email: ${request.coach_contact_email || "N/A"}`, 10, 40);
    doc.text(
      `Preferred Location: ${request.preferred_location_primary || "N/A"}`,
      10,
      50
    );
    // doc.text(`Start Date: ${request.start_date || "N/A"}`, 10, 60);
    // doc.text(`End Date: ${request.end_date || "N/A"}`, 10, 70);
    /* 
  doc.text(`
Title with Team/ Organization/ Event: ${request.title_w_team_org_event || "N/A"}`,10, 40); 
       
          
       
       doc.text(`
Coach's Phone: ${request.coach_contact_phone || "N/A"}`,10, 40);
       doc.text(` Related Website: ${request.website || "N/A"}`,10, 40);
       doc.text(`Event Description: ${request.eventDescription || "N/A"}`, 10, 40);
        doc.text(`Type of Event:  ${request.event_type || "N/A"}`, 10, 40);
        request.preferredTime_start

	"date_submitted" 

	"event_type" 
	"rented_previously" 
	"preferred_time" 
	"preferred_location_secondary" 
	"preferred_space" 
	"priority" 
	"preferred_days" 
	"start_date" 
	"end_date" 
	"additional_dates" 
	"expected_attendance" 
	"WF_students" 
	"grade_level" 
	"team_pdf" 
	"read_rental_review" 
	"renter_first_name" 
	"renter_last_name" 
	"renter_street_address" 
	"renter_city" 
	"renter_state" 
	"renter_zip" 
	"renter_phone" 
	"renter_email" 
	"agree_to_respectful_use_of_space" 
	"agree_to_invoice_payment_process" 
 
      
        
        
       
          Preferred Location (Secondary Option)
          
       
          Preferred Space: request.preferred_space
      request.expected_attendance}
   
       request.ageGroup
        request.preferred_days
       request.specificAreas
       request.alternativeChoices
        request.start_date
        request.end_date
          Additional Dates: request.additional_dates
       
          Frequency: request.frequency
        
          85% West Fargo Students?: request.wf_students
        
          Grade Level: request.grade_level
        
          Cloudinary Link to Roster PDF: request.team_pdf
        District Acknowledgment: request.districtAcknowledgment
       Special Requests: request.specialRequests
        
          Rented Previously: request.rented_previously
       Frequency: request.read_Rental_Review
       
          Renter's Name: request.renter_first_name request.renter_last_name
       
          Renter's Street Address: request.renter_street_address
       
          Renter's City: request.renter_city
        
          Renter's State: request.renter_state
       
          Renter's ZIP code: request.renter_zip
        
          Renter's Phone #: request.renter_phone
        
          Renter's Email: request.renter_email
       


*/
    doc.text(``);
    doc.save("AdminDataView.pdf");
  };

  const handleSendByEmail = async () => {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    doc.text(
      `Team/Organization/Event: ${request.team_org_event || "N/A"}`,
      10,
      20
    );
    doc.text(
      `Coach's Name: ${request.coach_contact_first_name || "N/A"} ${
        request.coach_contact_last_name || "N/A"
      }`,
      10,
      30
    );
    doc.text(`Coach's Email: ${request.coach_contact_email || "N/A"}`, 10, 40);
    doc.text(
      `Preferred Location: ${request.preferred_location_primary || "N/A"}`,
      10,
      50
    );
    doc.text(`Start Date: ${request.start_date || "N/A"}`, 10, 60);
    doc.text(`End Date: ${request.end_date || "N/A"}`, 10, 70);

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

  return !request ? null : (
    <Container fluid>
      <h2>{heading}</h2>
      <Row>
        <Col xs={6} md={4}>
          Team / Organization / Event: {request.team_org_event}
        </Col>
        <Col xs={6} md={4}>
          Title with Team/ Organization/ Event: {request.title_w_team_org_event}
        </Col>
        <Col xs={6} md={4}>
          Coach's Name: {request.coach_contact_first_name}{" "}
          {request.coach_contact_last_name}
        </Col>
        <Col xs={6} md={4}>
          Coach's Email: {request.coach_contact_email}
        </Col>
        <Col xs={6} md={4}>
          Coach's Phone #: {request.coach_contact_phone}
        </Col>
        <Col xs={6} md={4}>
          Related Website: {request.website}
        </Col>

        <Col xs={12}>Event Description: {request.eventDescription}</Col>
        <Col xs={6} md={4}>
          Type of Event: {request.event_type}
        </Col>
        <Col xs={6} md={4}>
          Preferred Timeframe: {request.preferredTime_start}
        </Col>
        <Col xs={6} md={4}>
          Preferred Location (Primary Option):{" "}
          {request.preferred_location_primary}
        </Col>
        <Col xs={6} md={4}>
          Preferred Location (Secondary Option):{" "}
          {request.preferred_location_secondary}
        </Col>
        <Col xs={6} md={4}>
          Preferred Space: {request.preferred_space}
        </Col>
        <Col xs={6} md={4}>
          Expected Attendance: {request.expected_attendance}
        </Col>
        {/* <Col xs={6} md={4}>Age Group: {request.ageGroup}</Col> */}
        <Col xs={6} md={4}>
          Preferred Days: {request.preferred_days}
        </Col>
        <Col xs={6} md={4}>
          Priority: {request.priority}
        </Col>
        <Col xs={6} md={4}>
          Specific Area: {request.specificAreas}
        </Col>
        {/* <Col xs={6} md={4}>Alternative Choices: {request.alternativeChoices}</Col> */}
        <Col xs={6} md={4}>
          Start Date: {request.start_date}
        </Col>
        <Col xs={6} md={4}>
          End Date: {request.end_date}
        </Col>
        <Col xs={6} md={4}>
          Additional Dates: {request.additional_dates}
        </Col>
        <Col xs={6} md={4}>
          Frequency: {request.frequency}
        </Col>

        <Col xs={6} md={4}>
          85% West Fargo Students?: {request.wf_students}
        </Col>
        <Col xs={6} md={4}>
          Grade Level: {request.grade_level}
        </Col>
        <Col xs={6} md={4}>
          Cloudinary Link to Roster PDF: {request.team_pdf}
        </Col>
        {/* <Col xs={6} md={4}>Liability  Proof: {request.liabilityProof}</Col> */}
        {/* <Col xs={6} md={4}>District Acknowledgment: {request.districtAcknowledgment}</Col>
        <Col xs={6} md={4}>Special Requests: {request.specialRequests}</Col> */}
        <Col xs={6} md={4}>
          Rented Previously: {request.rented_previously}
        </Col>
        {/* <Col xs={6} md={4}>Frequency: {request.read_Rental_Review}</Col> */}
        <Col xs={12}></Col>
        <br />
        <Col xs={6} md={4}>
          Renter's Name: {request.renter_first_name} {request.renter_last_name}
        </Col>
        <Col xs={6} md={4}>
          Renter's Street Address: {request.renter_street_address}
        </Col>
        <Col xs={6} md={4}>
          Renter's City: {request.renter_city}
        </Col>
        <Col xs={6} md={4}>
          Renter's State: {request.renter_state}
        </Col>
        <Col xs={6} md={4}>
          Renter's ZIP code: {request.renter_zip}
        </Col>
        <Col xs={6} md={4}>
          Renter's Phone #: {request.renter_phone}
        </Col>
        <Col xs={6} md={4}>
          Renter's Email: {request.renter_email}
        </Col>
        {/* <Col xs={6} md={4}>Frequency: {request.agreeToRespectfulUseOfSpace}</Col>
        <Col xs={6} md={4}>Frequency: {request.agreeToInvoicePaymentProcess}</Col> */}
      </Row>
      <Button onClick={handlePrint}>Download Pdf</Button>{" "}
      <Button onClick={handleSendByEmail}>Send by email</Button>
    </Container>
  );
}

export default AdminDataView;
