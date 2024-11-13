import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";


function AdminDataView() {
  const [heading, setHeading] = useState("Admin Data View");
  const [request, setRequest] = useState({});
  const location = useLocation();
  const requestID = new URLSearchParams(location.search).get('requestID');
  

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
  }, []);

  return !request ? null : (
    <Container fluid>
      <h2>{heading}</h2>

      <Row>

        <Col xs={6} md={4}>Team / Organization / Event: {request.team_org_event}</Col>
        <Col xs={6} md={4}>Title with Team/ Organization/ Event: {request.title_w_team_org_event}</Col>
        <Col xs={6} md={4}>Coach's Name: {request.coach_contact_first_name} {request.coach_contact_last_name}</Col>
        <Col xs={6} md={4}>Coach's Email: {request.coach_contact_email}</Col>
        <Col xs={6} md={4}>{request.coach_contact_phone}</Col>
        <Col xs={6} md={4}>{request.website}</Col>

      </Row>
    </Container>
  );
}

export default AdminDataView;
