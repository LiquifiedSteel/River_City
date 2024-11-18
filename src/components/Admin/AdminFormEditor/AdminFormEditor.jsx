import React, { useEffect, useState } from "react";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment";

const AdminFormEditor = () => {
  const location = useLocation();
  const history = useHistory();
  const requestID = new URLSearchParams(location.search).get("requestID");
  const [formValues, setFormValues] = useState({});
  console.log(formValues);

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "WF_students") {
      if (formValues.WF_students) {
        setFormValues({ ...formValues, [name]: false });
      } else {
        setFormValues({ ...formValues, [name]: true });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setTeamPdf(file); // ====== Save the file locally ======
  };

  const handleSave = () => {
    const saveUpdate = async () => {
      try {
        await axios.put(`/api/application/${requestID}`, formValues);
      } catch (error) {
        console.error("Error updating request:", error);
      }
    };
    saveUpdate();
    history.push("/admin-dashboard");
  };

  return !formValues ? null : (
    <div>
      <h2>Applicant Information</h2>
      <form>
        <div>
          <label>Coach's First Name</label>
          <input
            type="text"
            name="coach_contact_first_name"
            value={formValues.coach_contact_first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Coach's Last Name</label>
          <input
            type="text"
            name="coach_contact_last_name"
            value={formValues.coach_contact_last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Renter's First Name</label>
          <input
            type="text"
            name="renter_first_name"
            value={formValues.renter_first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Renter's Last Name</label>
          <input
            type="text"
            name="renter_last_name"
            value={formValues.renter_last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Organization Name (if applicable)</label>
          <input
            type="text"
            name="team_org_event"
            value={formValues.team_org_event}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title_w_team_org_event"
            value={formValues.title_w_team_org_event}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mailing Address</label>
          <input
            type="text"
            name="renter_street_address"
            value={formValues.renter_street_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={formValues.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Event Type</label>
          <select
            name="event_type"
            value={formValues.event_type}
            onChange={handleChange}
          >
            <option value="">Select an Event Type</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Scouts">Scouts</option>
            <option value="Dance">Dance</option>
            <option value="Others">Other</option>
          </select>
        </div>

        <div>
          <label>Preferred Start Time</label>
          <select
            name="preferred_time"
            value={formValues.preferred_time}
            onChange={handleChange}
          >
            <option value="">Select Start Time</option>
            <option value="06:00:00">6:00 PM - 7:00 PM</option>
            <option value="07:00:00">7:00 PM - 8:00 PM</option>
            <option value="08:00:00">8:00 PM - 9:00 PM</option>
            <option value="09:00:00">9:00 PM - 10:00 PM</option>
          </select>
        </div>

        <div>
          <label>Primary Location</label>
          <select
            name="preferred_location_primary"
            value={formValues.preferred_location_primary}
            onChange={handleChange}
          >
            <option value="">Select Primary Location</option>
            <option value={1}>School 1</option>
            <option value={2}>School 2</option>
          </select>
        </div>

        <div>
          <label>Secondary Location</label>
          <select
            name="preferred_location_secondary"
            value={formValues.preferred_location_secondary}
            onChange={handleChange}
          >
            <option value="">Select Secondary Location</option>
            <option value={1}>School 1</option>
            <option value={2}>School 2</option>
          </select>
        </div>

        <div>
          <label>Preferred Space</label>
          <div>
            <label>
              <select
                name="preferred_space"
                value={formValues.preferred_space}
                onChange={handleChange}
              >
                <option value={1}>Meeting Room</option>
                <option value={2}>Gymnasium</option>
                <option value={3}>Classroom</option>
                <option value={4}>Auditorium</option>
                <option value={5}>Turf Field</option>
              </select>
              {/* <input
                                type="checkbox"
                                name="preferred_space"
                                value="Gymnasium"
                                checked={formValues.preferred_space?.includes("Gymnasium") || false}
                                onChange={handleCheckboxChange}
                            />
                            Gymnasium
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Commons"
                                checked={formValues.preferred_space?.includes("Commons") || false}
                                onChange={handleCheckboxChange}
                            />
                            Commons
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Library / Media Center"
                                checked={formValues.preferred_space?.includes("Library / Media Center") || false}
                                onChange={handleCheckboxChange}
                            />
                            Library / Media Center
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Locker Room"
                                checked={formValues.preferred_space?.includes("Locker Room") || false}
                                onChange={handleCheckboxChange}
                            />
                            Locker Room
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Turf Field"
                                checked={formValues.preferred_space?.includes("Turf Field") || false}
                                onChange={handleCheckboxChange}
                            />
                            Turf Field */}
            </label>
          </div>
        </div>

        {/* <div>
                    <label>Event Description</label>
                    <textarea
                        name="eventDescription"
                        value={formValues.eventDescription}
                        onChange={handleChange}
                        
                    />
                </div> */}

        <div>
          <label>Expected Attendance</label>
          <input
            type="number"
            name="expected_attendance"
            value={formValues.expected_attendance}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Preferred Days</label>
          <select
            name="preferred_days"
            value={formValues.preferred_days}
            onChange={handleChange}
          >
            <option value="">Select Preferred Days</option>
            <option value="Monday/Thursdays">Monday/Thursdays</option>
            <option value="Tuesday/Fridays">Tuesday/Fridays</option>
            <option value="Mondays">Mondays</option>
            <option value="Tuesdays">Tuesdays</option>
            <option value="Thursdays">Thursdays</option>
            <option value="Fridays">Fridays</option>
          </select>
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formValues.start_date}
            onChange={handleChange}
          />
          Currently: {moment(formValues.start_date).format("MMM Do YY")}
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date}
            onChange={handleChange}
          />
          Currently: {moment(formValues.end_date).format("MMM Do YY")}
        </div>

        <div>
          <label>Additional Dates</label>
          <input
            type="text"
            name="additional_dates"
            value={formValues.additional_dates}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            Is the team or group made up of 85% or more WF Students?
          </label>
          <input
            type="checkbox"
            name="WF_students"
            checked={formValues.WF_students}
            onChange={handleChange}
          />
        </div>
        {formValues.WF_students && (
          <>
            <div>
              <label>Grade Level</label>
              <input
                type="text"
                name="grade_level"
                value={formValues.grade_level}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Upload Team PDF</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                name="team_pdf"
                onChange={handleFileUpload}
              />
              Currently: {formValues.team_pdf}
            </div>
          </>
        )}
        {/* <div>
                    <label>Liability Proof</label>
                    <input
                        type="text"
                        name="liabilityProof"
                        value={formValues.liabilityProof}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Special Requests</label>
                    <textarea
                        name="specialRequests"
                        value={formValues.specialRequests}
                        onChange={handleChange}
                    />
                </div> */}
        <div>
          <label>Renter First Name</label>
          <input
            type="text"
            name="renter_first_name"
            value={formValues.renter_first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Renter Last Name</label>
          <input
            type="text"
            name="renter_last_name"
            value={formValues.renter_last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            name="renter_street_address"
            value={formValues.renter_street_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="renter_city"
            value={formValues.renter_city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="renter_state"
            value={formValues.renter_state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="renter_zip"
            value={formValues.renter_zip}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="renter_phone"
            value={formValues.renter_phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="renter_email"
            value={formValues.renter_email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={() => handleSave()}>
          Save Changes
        </button>
        <button type="button" onClick={() => history.push("/admin-dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminFormEditor;
