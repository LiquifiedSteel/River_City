/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Import useHistory for navigation
import { css } from "@emotion/react"; // Import css from emotion for styling
import Tooltip from "react-bootstrap/Tooltip"; // Import Tooltip from Bootstrap
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; // Import OverlayTrigger for tooltips
import "./AdminDashboard.css";

// Define Emotion CSS styles for various elements
const headerStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2rem;
`;

// Main AdminDashboard component
function AdminDashboard() {
  // Hook to handle navigation
  const history = useHistory();

  // useEffect to fetch data on component mount
  useEffect(() => {
    
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Container>
        {/* Header */}
        <h1 css={headerStyle}>Admin Dashboard</h1>

        <Row>
          {history.location.pathname==="/admin-users" ?
          <Col md={{ offset: 1}}><button className="envButton adminDash" onClick={() => history.push("/admin-users")}>Users</button></Col> :
          <Col md={{ offset: 1}}><button className="envButton" onClick={() => history.push("/admin-users")}>Users</button></Col>}

          {history.location.pathname==="/admin-budget" ?
          <Col><button className="envButton adminDash" onClick={() => history.push("/admin-budget")}>Budget</button></Col> :
          <Col><button className="envButton" onClick={() => history.push("/admin-budget")}>Budget</button></Col>}

          {history.location.pathname==="/admin-checks" ?
          <Col><button className="envButton adminDash" onClick={() => history.push("/admin-checks")}>Checks</button></Col> :
          <Col><button className="envButton" onClick={() => history.push("/admin-checks")}>Checks</button></Col>}

          {history.location.pathname==="/admin-envelopes" ?
          <Col><button className="envButton adminDash" onClick={() => history.push("/admin-envelopes")}>Envelopes</button></Col> :
          <Col><button className="envButton" onClick={() => history.push("/admin-envelopes")}>Envelopes</button></Col>}

          {history.location.pathname==="/admin-transactions" ?
          <Col><button className="envButton adminDash" onClick={() => history.push("/admin-transactions")}>Transactions</button></Col> :
          <Col><button className="envButton" onClick={() => history.push("/admin-transactions")}>Transactions</button></Col>}
        </Row>
        
      </Container>
    </>
  );
}

export default AdminDashboard;
