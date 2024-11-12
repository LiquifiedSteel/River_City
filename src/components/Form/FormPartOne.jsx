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
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Coach First Name</label>
          <input
            type="text"
            name="coachFirstName"
            value={formValues.coachFirstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Coach Last Name</label>
          <input
            type="text"
            name="coachLastName"
            value={formValues.coachLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Organization Name (if applicable)</label>
          <input
            type="text"
            name="organizationName"
            value={formValues.organizationName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mailing Address</label>
          <input
            type="text"
            name="mailingAddress"
            value={formValues.mailingAddress}
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
