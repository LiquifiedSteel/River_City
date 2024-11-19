/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";
import axios from "axios";
import { css } from "@emotion/react";

const formContainerStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
`;

const labelStyle = css`
  font-weight: 600;
  margin-bottom: 5px;
`;

const descriptionStyle = css`
  font-size: 0.9rem;
  color: #6c757d;
`;

const infoTextStyle = css`
  margin-bottom: 15px;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #6c757d;
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
    if (formValues.event_type !== "") {
      if (formValues.preferred_time !== "") {
        if(formValues.preferred_location_primary !== "" && formValues.preferred_location_primary !== 0) {
          if(formValues.preferred_location_secondary !== "" && formValues.preferred_location_secondary !== 0) {
            if(formValues.preferred_space.length !== 0) {
              if(formValues.priority !== "") {
                dispatch(updateFormPartOne(formValues));
                history.push("/form-part-two");
              } else {
                alert("Please choose what you want prioritized");
              }
            } else {
              alert("Please choose one or more preferred types of spaces.");
            }
          } else {
            alert("Please choose a secondary location option.");
          }
        } else {
          alert("Please choose a primary location option.");
        }
      } else {
        alert("Please choose a preferred time.");
      }
    } else {
      alert("Please choose an event type.");
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
            Title with Team/Organization/Event
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
          <label css={labelStyle}>Priority for Event Scheduling *</label>
          <select
            name="priority"
            value={formValues.priority}
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="Time">Preferred Time</option>
            <option value="Days">Preferred Days</option>
            <option value="Location">Preferred Location</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
