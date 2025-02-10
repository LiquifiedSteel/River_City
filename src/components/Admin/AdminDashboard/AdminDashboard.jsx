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

        <div>
          <button onClick={() => history.push("/admin-users")}>Users</button>
          <button onClick={() => history.push("/admin-budget")}>Budget</button>
          <button onClick={() => history.push("/admin-checks")}>Checks</button>
          <button onClick={() => history.push("/admin-envelopes")}>Envelopes</button>
          <button onClick={() => history.push("/admin-transactions")}>Transactions</button>
        </div>
        
      </Container>
    </>
  );
}

export default AdminDashboard;
