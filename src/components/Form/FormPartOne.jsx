// src/components/Form/FormPartOne.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";

const FormPartOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartOne = useSelector((state) => state.form.FormPartOne);

  const [formValues, setFormValues] = useState(formPartOne);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNext = () => {
    dispatch(updateFormPartOne(formValues));
    history.push("/form-part-two");
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked
        ? [...(formValues[name] || []), value]
        : formValues[name].filter((v) => v !== value),
    });
  };

  return (
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
            required
          />
        </div>
        <div>
          <label>Coach's Email Address</label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Coach's Phone Number</label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone}
            onChange={handleChange}
            required
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
            required
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
            required
          >
            <option value="">Select Start Time</option>
            <option value="6:00 PM">6:00 PM - 7:00 PM</option>
            <option value="7:00 PM">7:00 PM - 8:00 PM</option>
            <option value="8:00 PM">8:00 PM - 9:00 PM</option>
            <option value="9:00 PM">9:00 PM - 10:00 PM</option>
          </select>
        </div>

        <div>
          <label>Primary Location</label>
          <select
            name="preferred_location_primary"
            value={formValues.preferred_location_primary}
            onChange={handleChange}
            required
          >
            <option value="">Select Primary Location</option>
            <option value="1">School 1</option>
            <option value="2">School 2</option>
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
            <option value="1">School 1</option>
            <option value="2">School 2</option>
          </select>
        </div>

        <div>
          <label>Preferred Space</label>
          <div>
            <label>
              <input
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
              Turf Field
            </label>
          </div>
        </div>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
