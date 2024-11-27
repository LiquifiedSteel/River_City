/** @jsxImportSource @emotion/react */
// Import React and other necessary libraries
import React, { useState, useEffect } from "react"; // React for UI, useState/useEffect for state management
import { useLocation } from "react-router-dom"; // useLocation for getting URL query parameters
import axios from "axios"; // Axios for making API requests
import { jsPDF } from "jspdf"; // jsPDF for generating downloadable PDF files
import { Container, Row, Col, Button, Card } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { css } from "@emotion/react"; // Emotion library for writing CSS-in-JS styles

// Define reusable CSS-in-JS styles using Emotion
/* Styling for the main heading at the top of the page */
const headingStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2.5rem;
  color: #2c3e50;
`;
/* Styling for each card (grouped section) displayed on the page */
const cardStyle = css`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;
/* Styling for section titles inside cards */
const sectionTitleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #34495e;
`;
/* Styling for labels displayed beside field values */
const labelStyle = css`
  font-weight: bold;
  color: #2c3e50;
`;
/* Styling for field values (data from API) */
const fieldValueStyle = css`
  color: #34495e;
`;
/* Styling for the PDF download button */
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

// Main Component: AdminDataView
const AdminDataView = () => {
  // Initialize state variables
  const [heading] = useState("Admin Data View"); // Static heading for the page
  const [request, setRequest] = useState({}); // Holds the details of a specific application request
  const [locations, setLocations] = useState([]); // Holds location data for dropdown or display
  const location = useLocation(); // React Router's hook to access the current URL
  const requestID = new URLSearchParams(location.search).get("requestID"); // Extracts the "requestID" query parameter from the URL

  // useEffect: Executes once when the component is mounted
  useEffect(() => {
    document.title = "View Request Data"; // Dynamically sets the browser tab title

    // Function to fetch data for a specific request
    const fetchRequest = async () => {
      try {
        // Fetch specific request data based on requestID
        const response = await axios.get(`/api/application/${requestID}`);
        setRequest(response.data[0]); // Store the first record in state
      } catch (error) {
        console.error("Error fetching request:", error); // Handle errors gracefully
      }
      try {
        // Fetch all available location data
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data); // Store locations in state
      } catch (error) {
        console.error("Error fetching locations:", error); // Handle errors gracefully
      }
    };

    fetchRequest(); // Trigger the data fetching logic
  }, [requestID]); // Re-run this effect only if `requestID` changes

  // Function to generate PDF content dynamically
  const generatePdfContent = (doc, request, locations) => {
    let yPosition = 10; // Initial vertical position for content in the PDF
    const lineHeight = 10; // Distance between lines of text
    const leftMargin = 10; // Left margin for PDF content alignment

    // Extract primary and secondary location names using their IDs
    const primaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_primary
    )?.name_of_Location;

    const secondaryLocation = locations.find(
      (loc) => loc.id === request.preferred_location_secondary
    )?.name_of_Location;

    // Format "preferred space" as a string if it's an array
    const preferredSpace = Array.isArray(request.preferred_space)
      ? request.preferred_space.join(", ")
      : request.preferred_space;

    // Add title and subtitle to the PDF
    doc.setFontSize(16); // Set large font size
    doc.text("West Fargo Public Schools", leftMargin, yPosition); // Main title
    yPosition += lineHeight * 2; // Add vertical spacing

    doc.setFontSize(12); // Set smaller font size
    doc.setFont("helvetica", "bold");
    doc.text("Rental Application Summary", leftMargin, yPosition); // Subtitle
    yPosition += lineHeight * 1.5;

    // Array of fields to be added to the PDF
    const fields = [
      ["Team/Organization/Event", request.team_org_event],
      ["Primary Location", primaryLocation],
      ["Secondary Location", secondaryLocation],
      ["Preferred Space", preferredSpace],
      ["Special Requests", request.special_requests],
    ];

    // Add fields dynamically to the PDF
    doc.setFontSize(10); // Set regular font size
    doc.setFont("helvetica", "normal");
    fields.forEach(([label, value]) => {
      if (value && value !== "N/A" && value !== undefined) {
        doc.text(`${label}:`, leftMargin, yPosition); // Label
        doc.setFont("helvetica", "bold");
        doc.text(`${value}`, leftMargin + 80, yPosition, { align: "left" }); // Value
        doc.setFont("helvetica", "normal");
        yPosition += lineHeight; // Move down to the next line

        // Start a new page if the content exceeds current page height
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10; // Reset position for the new page
        }
      }
    });
  };

  // Event handler for downloading the PDF
  const handleDownload = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    generatePdfContent(doc, request, locations); // Generate the content
    doc.save("AdminDataView.pdf"); // Trigger download
  };

  // Helper function to render individual fields on the page
  const renderField = (label, value) => (
    <Col xs={12} md={6} className="mb-3">
      <span css={labelStyle}>{label}: </span> {/* Label */}
      <span css={fieldValueStyle}>{value || "N/A"}</span> {/* Value */}
    </Col>
  );

  // JSX returned for rendering the component
  return (
    <Container fluid>
      <h2 css={headingStyle}>{heading}</h2> {/* Page heading */}
      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Team / Event Details</h3>
        <Row>
          {renderField("Team / Organization / Event", request.team_org_event)}
          {/* Add more fields as needed */}
        </Row>
      </Card>
      <Card css={cardStyle}>
        <h3 css={sectionTitleStyle}>Event Details</h3>
        <Row>
          {renderField("Event Description", request.event_description)}
          {/* Add more fields as needed */}
        </Row>
      </Card>
      {/* Download button */}
      <div className="d-flex justify-content-center mt-4">
        <button css={buttonStyle} onClick={handleDownload} className="mx-2">
          Download PDF
        </button>
      </div>
    </Container>
  );
};

// Export the component as default
export default AdminDataView;
