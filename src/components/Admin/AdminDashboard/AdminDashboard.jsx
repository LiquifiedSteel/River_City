import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/application");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <h1>Welcome, {user.username}</h1>
      <Container>
        <h2>Admin Dashboard</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Event Title</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Event Type</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.team_org_event}</td>
                <td>{app.title_w_team_org_event}</td>
                <td>
                  {app.coach_Contact_first_name} {app.coach_Contact_last_name}
                </td>
                <td>{app.coach_contact_phone}</td>
                <td>{app.coach_contact_email}</td>
                <td>{app.event_type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminDashboard;
