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

const sectionTitleStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const labelStyle = css`
  font-weight: 600;
  margin-bottom: 5px;
`;

const descriptionStyle = css`
  font-size: 0.9rem;
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

  const handleNext = () => {
    dispatch(updateFormPartOne(formValues));
    history.push("/form-part-two");
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
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Applicant Information</h2>
      <p className={descriptionStyle}>
        West Fargo Public Schools makes its elementary, middle, and high school
        facilities available for public use, with some exceptions. Please
        submit your rental application at least five business days before the
        desired use date. <b>Note:</b> Team rosters are required if you wish to
        claim a WFPS student discount.
      </p>

      <p className={descriptionStyle}>
        Review the full Facility Rental Policy for detailed regulations. Use of
        facilities is automatically canceled if schools are closed due to
        weather or other conditions.
      </p>

      <form>
        {/* Team/Organization Details */}
        <div className="mb-3">
          <label css={labelStyle}>
            Team/Organization/Event Name
          </label>
          <input
            type="text"
            name="team_org_event"
            value={formValues.team_org_event}
            className="form-control"
            onChange={handleChange}
          />
          <small className={descriptionStyle}>
            Note: Avoid using local sports team names like Packers or Mustangs.
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
            <label css={labelStyle}>Coach/Contact First Name</label>
            <input
              type="text"
              name="coach_contact_first_name"
              value={formValues.coach_contact_first_name}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label css={labelStyle}>Coach/Contact Last Name</label>
            <input
              type="text"
              name="coach_contact_last_name"
              value={formValues.coach_contact_last_name}
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>
            Coach/Contact Email Address
          </label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email}
            className="form-control"
            onChange={handleChange}
          />
          <small className={descriptionStyle}>
            Note: Avoid using WFPS staff emails for private rentals.
          </small>
        </div>

        <div className="mb-3">
        <label css={labelStyle}>
            Website
        </label>
        <input
            type="email"
            name="website"
            value={formValues.website}
            className="form-control"
            onChange={handleChange}
        />
        </div>



        <div className="mb-3">
          <label css={labelStyle}>
            Coach/Contact Phone Number
          </label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* Event Type */}
        <div className="mb-3">
          <label css={labelStyle}>Event Type</label>
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

        {/* Preferred Location */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label css={labelStyle}>
              Preferred Location (Primary)
            </label>
            <select
              name="preferred_location_primary"
              value={formValues.preferred_location_primary}
              className="form-select"
              onChange={handleLocation1}
            >
              <option value="">Select a Location</option>
              {locations
                .filter(
                  (location) => Number(location.id) !== location2
                )
                .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name_of_Location}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label css={labelStyle}>
              Preferred Location (Secondary)
            </label>
            <select
              name="preferred_location_secondary"
              value={formValues.preferred_location_secondary}
              className="form-select"
              onChange={handleLocation2}
            >
              <option value="">Select a Location</option>
              {locations
                .filter(
                  (location) => Number(location.id) !== location1
                )
                .map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name_of_Location}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={handleNext}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
