/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";
import axios from "axios";
import { css } from "@emotion/react";

const formContainerStyle = css`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #205831; 
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #f8f8f8; 
`;

const labelStyle = css`
  font-weight: 600;
  margin-bottom: 5px;
`;

const descriptionStyle = css`
  font-size: 0.9rem;
  color: #E6E6E6;
`;

const infoTextStyle = css`
  margin-bottom: 15px;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #eeeeee;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;

const buttonStyle = css`
  background-color: #ad9143;
  color: #252525;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  width: auto;
  max-width: 200px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #8c7634;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(173, 145, 67, 0.5);
  }
`;



const FormPartOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartOne = useSelector((state) => state.form.FormPartOne);

  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [locations, setLocations] = useState([]);
  const [formValues, setFormValues] = useState(formPartOne);

  useEffect(() => {
    document.title = "Rental Request Form";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

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

  const handleNext = (e) => {
    e.preventDefault();
    if(formValues.preferred_space.length !== 0) {
      dispatch(updateFormPartOne(formValues));
      history.push("/form-part-two");
    } else {
      alert("Please choose one or more preferred types of spaces.");
    }
  };

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
