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

  return (
    <div>
      <h2>Applicant Information</h2>
      <form>
        <div>
          <label>Renter's First Name</label>
          <input
            type="text"
            name="renter_first_name"
            value={formValues.renter_first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Renter's Last Name</label>
          <input
            type="text"
            name="renter_last_name"
            value={formValues.renter_last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>Renter's Mailing Address</label>
          <input
            type="text"
            name="renter_street_address"
            value={formValues.renter_street_address}
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
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
