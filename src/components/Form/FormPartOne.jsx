/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";
import axios from "axios";
import { css } from "@emotion/react";

// ===============================================
// ====== EMOTION STYLES FOR FORM COMPONENTS ======
// ===============================================

// === FORM CONTAINER ===
// Styles for the outer form container, providing structure and aesthetic.
const formContainerStyle = css`
  max-width: 900px; // Maximum width of the container
  margin: 40px auto; // Centered on the page with vertical spacing
  padding: 20px; // Padding for internal content spacing
  background: #205831; // Deep green background for contrast
  border-radius: 8px; // Smooth rounded corners
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  color: #f8f8f8; // Light text color for readability
`;

// === FORM LABELS ===
// Styles for form labels to ensure they stand out and are easy to read.
const labelStyle = css`
  font-weight: 600; // Bold text for emphasis
  margin-bottom: 5px; // Space between the label and the input
`;

// === FORM DESCRIPTIONS ===
// Styles for helper text or descriptions accompanying form fields.
const descriptionStyle = css`
  font-size: 0.9rem; // Smaller font for secondary information
  color: #E6E6E6; // Light gray for a subdued appearance
`;

// === INFO TEXT ===
// Styles for informational paragraphs within the form.
const infoTextStyle = css`
  margin-bottom: 15px; // Space between text blocks
  font-size: 0.85rem; // Smaller, secondary font size
  line-height: 1.5; // Line height for better readability
  color: #eeeeee; // Very light gray for subtle contrast
`;

// === BUTTON CONTAINER ===
// Styles for the container that holds buttons, ensuring proper alignment.
const buttonContainerStyle = css`
  display: flex; // Aligns items in a row
  justify-content: flex-start; // Aligns buttons to the left
  margin: 10px 0; // Vertical spacing for the container
`;

// === BUTTON STYLE ===
// Styles for buttons, including hover and focus states for better UX.
const buttonStyle = css`
  background-color: #ad9143; // Warm gold color for visibility
  color: #252525; // Dark text for readability
  font-weight: bold; // Bold text for emphasis
  border: none; // Removes default button border
  border-radius: 4px; // Smooth, rounded corners
  padding: 8px 16px; // Comfortable click area
  font-size: 0.9rem; // Medium font size for readability
  text-align: center; // Center-aligned text
  cursor: pointer; // Pointer cursor for interactivity
  width: auto; // Adapts width to content
  max-width: 200px; // Limits button size
  transition: background-color 0.3s ease, transform 0.2s ease; // Smooth transition effects

  &:hover {
    background-color: #8c7634; // Darker shade for hover effect
    transform: translateY(-2px); // Subtle lift effect
  }

  &:focus {
    outline: none; // Removes default outline
    box-shadow: 0px 0px 5px rgba(173, 145, 67, 0.5); // Glow effect for focus
  }
`;

// ===============================================
// ====== DISPATCH TO REDUX FIRST FORM PART ======
// ===============================================
const FormPartOne = () => {
  // ====== HOOKS ======
  const dispatch = useDispatch(); // Redux dispatch for state updates
  const history = useHistory(); // React Router history for navigation
  const formPartOne = useSelector((state) => state.form.FormPartOne); // Fetches initial form data from Redux

  // ====== STATE VARIABLES ======
  const [location1, setLocation1] = useState(null); // Tracks primary location selection
  const [location2, setLocation2] = useState(null); // Tracks secondary location selection
  const [locations, setLocations] = useState([]); // Stores available locations fetched from API
  const [formValues, setFormValues] = useState(formPartOne); // Tracks form field values, initialized from Redux state

  // ====== MOUNTING USE-EFFECT ======
  useEffect(() => {
    document.title = "Rental Request Form"; // Sets page title when the component mounts

    // Fetches location options from the API
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data); // Updates state with fetched locations
      } catch (error) {
        console.error("Error fetching locations:", error); // Logs error if API call fails
      }
    };

    fetchLocations();
  }, []);

  // ====== EVENT HANDLERS ======

  // Handles text input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // Updates state dynamically based on field name
  };

  // Handles checkbox input changes for multi-select fields
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked
        ? [...(formValues[name] || []), value] // Adds checked value to the array
        : formValues[name].filter((v) => v !== value), // Removes unchecked value from the array
    });
  };

  // Updates state with the selected primary location
  const handleLocation1 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // Updates form values
    setLocation1(Number(value)); // Sets primary location ID
  };

  // Updates state with the selected secondary location
  const handleLocation2 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // Updates form values
    setLocation2(Number(value)); // Sets secondary location ID
  };

  // Handles "Next" button click, validating inputs and navigating to the next form part
  const handleNext = (e) => {
    e.preventDefault(); // Prevents default form submission

    // Validates that at least one preferred space is selected
    if (formValues.preferred_space.length !== 0) {
      dispatch(updateFormPartOne(formValues)); // Dispatches form data to Redux
      history.push("/form-part-two"); // Navigates to the next form part
    } else {
      alert("Please choose one or more preferred types of spaces."); // Alerts user if validation fails
    }
  };


  // ====== COMPONENT RETURN ======
  return (
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Applicant Information</h2>

      <p css={infoTextStyle}>
        <strong>Rental Information</strong>: West Fargo Public Schools makes
        its elementary, middle, and high school facilities available for public
        use, with some exceptions. Please submit your rental application at
        least five business days in advance of the desired use date(s).
        Team/organization rosters must be submitted in conjunction with an
        application if an organization feels they may be eligible for the WFPS
        student discount.
      </p>

      <p css={infoTextStyle}>
        Applications may be referred to another school facility if the
        requested facility is unavailable or inappropriate for the purposes of
        the requesting client. Use of the facilities shall not be permitted to
        interfere with the operation of the schools or with school activities.
        School-sponsored activities always take precedence, even when scheduled
        after the signing of a facility rental contract.
      </p>

      <p css={infoTextStyle}>
        Once the application has been approved by all appropriate parties
        within the district, a rental contract will be issued, and the event
        will be added to the appropriate district calendar(s).
      </p>

      <p css={infoTextStyle}>
        Use of the facilities by clients is automatically canceled when schools
        must be closed due to inclement weather or other conditions.
      </p>

      <p css={infoTextStyle}>
        <strong>Note:</strong> Review the complete Facility Rental Policy
        located on our Facility Rental Website or on your contract.
      </p>

      <form onSubmit={handleNext}>
        {/* Team/Organization Details */}
        <div className="mb-3">
          <label css={labelStyle}>
            Team/Organization/Event Name *
          </label>
          <input
            type="text"
            name="team_org_event"
            value={formValues.team_org_event}
            className="form-control"
            onChange={handleChange}
            required
          />
          <small className={descriptionStyle}>
            Avoid using local sports team names like Packers or Mustangs.
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>
            Coach/Contact's title within Team/Organization/Event
          </label>
          <input
            type="text"
            name="title_w_team_org_event"
            value={formValues.title_w_team_org_event}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label css={labelStyle}>Coach/Contact First Name *</label>
            <input
              type="text"
              name="coach_contact_first_name"
              value={formValues.coach_contact_first_name}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label css={labelStyle}>Coach/Contact Last Name *</label>
            <input
              type="text"
              name="coach_contact_last_name"
              value={formValues.coach_contact_last_name}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>
            Coach/Contact Personal Email Address *
          </label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email}
            className="form-control"
            onChange={handleChange}
            required
          />
          <small className={descriptionStyle}>
            Avoid using WFPS staff emails for private rentals.
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>
            Coach/Contact Personal Phone Number *
          </label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label css={labelStyle}>Website</label>
          <input
            type="url"
            name="website"
            value={formValues.website}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label css={labelStyle}>Event Type *</label>
          <select
            name="event_type"
            value={formValues.event_type}
            className="form-select"
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

        <div className="mb-3">
          <label css={labelStyle}>Preferred Time *</label>
          <select
            name="preferred_time"
            value={formValues.preferred_time}
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">Select a Preferred Time</option>
            <option value="6:00 PM">6:00 PM - 7:00 PM (Elementary School Only)</option>
            <option value="7:00 PM">7:00 PM - 8:00 PM (Elementary School Only)</option>
            <option value="8:00 PM">8:00 PM - 9:00 PM (Elementary & Middle School)</option>
            <option value="9:00 PM">9:00 PM - 10:00 PM (Middle School Only)</option>
          </select>
          <small className={descriptionStyle}>
            Elem schools are only available from 6PM - 9PM Middle schools are only available from 8pm-10pm
          </small>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label css={labelStyle}>Preferred Location (Primary) *</label>
            <select
              name="preferred_location_primary"
              value={formValues.preferred_location_primary}
              className="form-select"
              onChange={handleLocation1}
              required
            >
              <option value="">Select a Location</option>
              {locations
                .filter((location) => Number(location.id) !== location2)
                .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name_of_Location}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label css={labelStyle}>Preferred Location (Secondary) *</label>
            <select
              name="preferred_location_secondary"
              value={formValues.preferred_location_secondary}
              className="form-select"
              onChange={handleLocation2}
              required
            >
              <option value="">Select a Location</option>
              {locations
                .filter((location) => Number(location.id) !== location1)
                .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name_of_Location}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>Preferred Space *</label>
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

        <div className="mb-3">
          <label css={labelStyle}>Preferred Days *</label>
          <select
            name="preferred_days"
            value={formValues.preferred_days}
            className="form-select"
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
          <small css={descriptionStyle}>
            Requests for twice-weekly practices and meetings will be reserved on Mon/Thur or Tue/Fri.
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>Priority for Event Scheduling *</label>
          <select
            name="priority"
            value={formValues.priority}
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="Time">Preferred Time</option>
            <option value="Days">Preferred Days</option>
            <option value="Location">Preferred Location</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn w-100 mt-3"
          css={buttonStyle}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
