/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment";
import { css } from "@emotion/react";

const containerStyle = css`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const sectionStyle = css`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
`;

const sectionHeading = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const labelStyle = css`
  display: block;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccd1d9;
  border-radius: 4px;
  font-size: 1rem;
  color: #2c3e50;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.4);
  }
`;

const selectStyle = css`
  ${inputStyle}
`;

const checkboxContainer = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  input {
    margin-right: 10px;
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

const buttonStyle = css`
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:last-of-type {
    background-color: #e74c3c;

    &:hover {
      background-color: #c0392b;
    }
  }
`;

const AdminFormEditor = () => {
  const location = useLocation();
  const history = useHistory();
  const requestID = new URLSearchParams(location.search).get("requestID");
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/application/${requestID}`);
        setFormValues(response.data[0]);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };
    fetchRequest();
  }, [requestID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormValues((prev) => ({ ...prev, team_pdf: file.name }));
  };

  const handleSave = () => {
    const saveUpdate = async () => {
      try {
        await axios.put(`/api/application/${requestID}`, formValues);
        history.push("/admin-dashboard");
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };
    saveUpdate();
  };

  return (
    <div css={containerStyle}>
      <h1>Edit Form</h1>
      <form>
        {/* Applicant Details */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Applicant Information</h2>
          <label css={labelStyle}>Coach's First Name</label>
          <input
            type="text"
            name="coach_contact_first_name"
            value={formValues.coach_contact_first_name || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Coach's Last Name</label>
          <input
            type="text"
            name="coach_contact_last_name"
            value={formValues.coach_contact_last_name || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Renter's First Name</label>
          <input
            type="text"
            name="renter_first_name"
            value={formValues.renter_first_name || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Renter's Last Name</label>
          <input
            type="text"
            name="renter_last_name"
            value={formValues.renter_last_name || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Organization Name</label>
          <input
            type="text"
            name="team_org_event"
            value={formValues.team_org_event || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Title</label>
          <input
            type="text"
            name="title_w_team_org_event"
            value={formValues.title_w_team_org_event || ""}
            onChange={handleChange}
            css={inputStyle}
          />
        </div>

        {/* Event Details */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Event Information</h2>
          <label css={labelStyle}>Email Address</label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Phone Number</label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Mailing Address</label>
          <input
            type="text"
            name="renter_street_address"
            value={formValues.renter_street_address || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Website</label>
          <input
            type="url"
            name="website"
            value={formValues.website || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Event Type</label>
          <select
            name="event_type"
            value={formValues.event_type || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Event Type</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Dance">Dance</option>
            <option value="Others">Others</option>
          </select>

          <label css={labelStyle}>Preferred Start Time</label>
          <select
            name="preferred_time"
            value={formValues.preferred_time || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Start Time</option>
            <option value="06:00:00">6:00 PM - 7:00 PM</option>
            <option value="07:00:00">7:00 PM - 8:00 PM</option>
            <option value="08:00:00">8:00 PM - 9:00 PM</option>
            <option value="09:00:00">9:00 PM - 10:00 PM</option>
          </select>

          <label css={labelStyle}>Expected Attendance</label>
          <input
            type="number"
            name="expected_attendance"
            value={formValues.expected_attendance || ""}
            onChange={handleChange}
            css={inputStyle}
          />
        </div>

        {/* Dates */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Dates</h2>
          <label css={labelStyle}>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formValues.start_date || ""}
            onChange={handleChange}
            css={inputStyle}
          />
          <span>Currently: {moment(formValues.start_date).format("MMM Do YY")}</span>

          <label css={labelStyle}>End Date</label>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date || ""}
            onChange={handleChange}
            css={inputStyle}
          />
          <span>Currently: {moment(formValues.end_date).format("MMM Do YY")}</span>

          <label css={labelStyle}>Additional Dates</label>
          <input
            type="text"
            name="additional_dates"
            value={formValues.additional_dates || ""}
            onChange={handleChange}
            css={inputStyle}
          />
        </div>

        {/* Location */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Location Preferences</h2>
          <label css={labelStyle}>Primary Location</label>
          <select
            name="preferred_location_primary"
            value={formValues.preferred_location_primary || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Primary Location</option>
            <option value={1}>School 1</option>
            <option value={2}>School 2</option>
          </select>

          <label css={labelStyle}>Secondary Location</label>
          <select
            name="preferred_location_secondary"
            value={formValues.preferred_location_secondary || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Secondary Location</option>
            <option value={1}>School 1</option>
            <option value={2}>School 2</option>
          </select>

          <label css={labelStyle}>Preferred Space</label>
          <select
            name="preferred_space"
            value={formValues.preferred_space || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Preferred Space</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Classroom">Classroom</option>
            <option value="Auditorium">Auditorium</option>
          </select>
        </div>

        {/* Additional */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Additional Information</h2>
          <div css={checkboxContainer}>
            <input
              type="checkbox"
              name="WF_students"
              checked={!!formValues.WF_students}
              onChange={handleChange}
            />
            <label>Is the team or group made up of 85% or more WF Students?</label>
          </div>

          {formValues.WF_students && (
            <>
              <label css={labelStyle}>Grade Level</label>
              <input
                type="text"
                name="grade_level"
                value={formValues.grade_level || ""}
                onChange={handleChange}
                css={inputStyle}
              />

              <label css={labelStyle}>Upload Team PDF</label>
              <input
                type="file"
                name="team_pdf"
                onChange={handleFileUpload}
                css={inputStyle}
              />
              <span>Currently: {formValues.team_pdf || "No file uploaded"}</span>
            </>
          )}
        </div>

        {/* Buttons */}
        <div css={buttonContainer}>
          <button type="button" onClick={handleSave} css={buttonStyle}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => history.push("/admin-dashboard")}
            css={buttonStyle}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFormEditor;
