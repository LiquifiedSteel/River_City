import React, { useState } from "react";
import { useSelector } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";


function AdminDataView() {
  const [heading, setHeading] = useState("Admin Data View");
  const request = {website: "example"};
  return (
    <Container fluid>
      <h2>{heading}</h2>

      <Row>

        Testing
        <Col xs={6} md={3}>{request.website}</Col>

        {/* <Col xs={6} md={3}>{request.team_org_event}</Col>
        <Col xs={6} md={3}>{request.title_w_team_org_event}</Col>
        <Col xs={6} md={3}>{request.coach_contact_first_name}</Col>
        <Col xs={6} md={3}>{request.coach_contact_last_name}</Col>
        <Col xs={6} md={3}>{request.coach_contact_email}</Col>
        <Col xs={6} md={3}>{request.coach_contact_phone}</Col>
        <Col xs={6} md={3}>{request.website}</Col> */}

      </Row>
    </Container>
  );
}

export default AdminDataView;
