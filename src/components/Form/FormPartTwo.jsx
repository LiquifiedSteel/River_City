import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartTwo } from "../../redux/reducers/form.reducer";

const FormPartTwo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartTwo = useSelector((state) => state.form.FormPartTwo);

  const [formValues, setFormValues] = useState(formPartTwo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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

  const handleNext = () => {
    dispatch(updateFormPartTwo(formValues));
    history.push("/form-part-three");
  };

  const handleBack = () => {
    history.push("/form-part-one");
  };

  return (
    <div>
      <h2>Event Details</h2>
      <form>
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
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Preferred Start Time</label>
          <select
            name="preferredTime_start"
            value={formValues.preferredTime_start}
            onChange={handleChange}
            required
          >
            <option value="">Select Start Time</option>
            <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
            <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
            <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
            <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
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

        <div>
          <label>Event Description</label>
          <textarea
            name="eventDescription"
            value={formValues.eventDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Expected Attendance</label>
          <input
            type="number"
            name="expected_attendance"
            value={formValues.expected_attendance}
            onChange={handleChange}
            required
          />
        </div>

       <div>
        <label>Preferred Days</label>
        <select
            name="preferred_days"
            value={formValues.preferred_days}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date}
            onChange={handleChange}
            required
          />
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

        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartTwo;
