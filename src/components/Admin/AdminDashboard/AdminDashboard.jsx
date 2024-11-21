/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { css } from "@emotion/react";

const headerStyle = css`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 2rem;
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

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    document.title = "Admin Dashboard";
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
      <Container>
        <h1 css={headerStyle}>Welcome, {user.username}</h1>
        <h2 css={headerStyle}>Admin Dashboard</h2>
        <Table striped bordered hover css={tableStyle}>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Event Title</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Event Type</th>
              <th>More Information</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.team_org_event}</td>
                <td>{app.title_w_team_org_event}</td>
                <td>
                  {app.coach_contact_first_name} {app.coach_contact_last_name}
                </td>
                <td>{app.coach_contact_phone}</td>
                <td>{app.coach_contact_email}</td>
                <td>{app.event_type}</td>
                <td>
                  <button
                    css={customButtonStyle}
                    className="view"
                    onClick={() =>
                      history.push(`/admin-data-view?requestID=${app.id}`)
                    }
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    css={customButtonStyle}
                    className="edit"
                    onClick={() =>
                      history.push(`/admin-form-editor?requestID=${app.id}`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminDashboard;
