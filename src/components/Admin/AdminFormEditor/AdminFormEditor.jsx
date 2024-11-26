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
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    document.title = "Editing Request";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/application/${requestID}`);
        setFormValues(response.data[0]);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
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

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, value, checked)
    setFormValues({
      ...formValues,
      [name]: checked
        ? [...(formValues[name] || []), value]
        : formValues[name].filter((v) => v !== value),
    });
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

  const handleLocation1 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setLocation1(Number(value));
  };

  const handleLocation2 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setLocation2(Number(value));
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
            <option value="Scouts">Scouts</option>
            <option value="Dance">Dance</option>
            <option value="Other">Other</option>
          </select>

          <label css={labelStyle}>Preferred Start Time</label>
          <select
            name="preferred_time"
            value={formValues.preferred_time || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="">Select Start Time</option>
            <option value="6:00 PM">6:00 PM - 7:00 PM</option>
            <option value="7:00 PM">7:00 PM - 8:00 PM</option>
            <option value="8:00 PM">8:00 PM - 9:00 PM</option>
            <option value="9:00 PM">9:00 PM - 10:00 PM</option>
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
          <span>Currently: {moment(formValues.start_date).format("MMM Do YY")}</span>
          <input
            type="date"
            name="start_date"
            value={formValues.start_date || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>End Date</label>
          <span>Currently: {moment(formValues.end_date).format("MMM Do YY")}</span>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Additional Dates</label>
          <input
            type="text"
            name="additional_dates"
            value={formValues.additional_dates || ""}
            onChange={handleChange}
            css={inputStyle}
          />

          <label css={labelStyle}>Day(s) of the Week</label>
          <select
            name="preferred_days"
            value={formValues.preferred_days || ""}
            onChange={handleChange}
            css={selectStyle}
          >
            <option value="Monday/Thursdays">Monday/Thursdays</option>
            <option value="Tuesday/Fridays">Tuesday/Fridays</option>
            <option value="Mondays">Mondays</option>
            <option value="Tuesdays">Tuesdays</option>
            <option value="Thursdays">Thursdays</option>
            <option value="Fridays">Fridays</option>
          </select>
        </div>

        {/* Location */}
        <div css={sectionStyle}>
          <h2 css={sectionHeading}>Location Preferences</h2>
          <label css={labelStyle}>Primary Location</label>
          <select
            name="preferred_location_primary"
            value={formValues.preferred_location_primary || ""}
            onChange={handleLocation1}
            css={selectStyle}
          >
            <option value="">Select Primary Location</option>
            {locations.filter((location) => Number(location.id) !== location2).map((location) => (
              <option key={location.id} value={location.id}>
                {location.name_of_Location}
              </option>
            ))}
          </select>

          <label css={labelStyle}>Secondary Location</label>
          <select
            name="preferred_location_secondary"
            value={formValues.preferred_location_secondary || ""}
            onChange={handleLocation2}
            css={selectStyle}
          >
            <option value="">Select Secondary Location</option>
            {locations.filter((location) => Number(location.id) !== location1).map((location) => (
              <option key={location.id} value={location.id}>
                {location.name_of_Location}
              </option>
            ))}
          </select>

          <label css={labelStyle}>Preferred Space</label>
          <div>
            {["Gymnasium", "Commons", "Library / Media Center", "Locker Room", "Turf Field"].map(
              (space) => (
                <label key={space} className="me-3">
                  <input
                    type="checkbox"
                    name="preferred_space"
                    value={space}
                    checked={formValues.preferred_space?.includes(space) || false}
                    onChange={handleCheckboxChange}
                    className="me-2"
                  />
                  {space}
                </label>
              )
            )}
          </div>
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
