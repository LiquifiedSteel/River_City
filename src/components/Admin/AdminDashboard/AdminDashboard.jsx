/** @jsxImportSource @emotion/react */
/**
 * AdminDashboard.jsx
 *
 * Purpose:
 *   Dashboard nav for admin sections with simple active-state styling.
 *
 * Notes:
 *   - Uses React Router v6 hooks. `useNavigate()` handles navigation,
 *     `useLocation()` provides the current pathname.
 *   - Avoids unused imports and unnecessary effects for a lean component.
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import "./AdminDashboard.css";

const headerStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2rem;
`;

function AdminDashboard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { to: "/admin-users", label: "Users" },
    { to: "/admin-budget", label: "Budget" },
    { to: "/admin-checks", label: "Checks" },
    { to: "/admin-envelopes", label: "Envelopes" },
    { to: "/admin-transactions", label: "Transactions" },
  ];

  const renderBtn = ({ to, label }, idx) => {
    const isActive = pathname === to;
    return (
      <Col key={to} md={idx === 0 ? { offset: 1 } : undefined}>
        <button
          type="button"
          className={`envButton${isActive ? " adminDash" : ""}`}
          onClick={() => navigate(to)}
        >
          {label}
        </button>
      </Col>
    );
  };

  return (
    <Container>
      <h1 css={headerStyle}>Admin Dashboard</h1>
      <Row>{items.map(renderBtn)}</Row>
    </Container>
  );
}

export default AdminDashboard;