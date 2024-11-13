import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.application);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_APPLICATIONS" });
  }, [dispatch]);

  return (
    <>
      <h1>Welcome, {user.username}</h1>

      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Event Title</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Event Type</th>
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
      </table>
    </>
  );
}

export default AdminDashboard;
