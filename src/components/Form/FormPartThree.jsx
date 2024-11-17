import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartThree, submitForm } from "../../redux/reducers/form.reducer";

const FormPartThree = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartThree = useSelector((state) => state.form.FormPartThree);
  const formPartTwo = useSelector((state) => state.form.FormPartTwo);
  const formPartOne = useSelector((state) => state.form.FormPartOne);

  const [formValues, setFormValues] = useState(formPartThree);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    dispatch(updateFormPartThree(formValues));
  };

  const handleBack = () => {
    history.push("/form-part-two");
  };

  const handleSubmit = () => {
    dispatch(submitForm({ formPartOne,  formPartTwo,  formPartThree}));
    history.push("/submission-success"); 
  };

  return (
    <div>
      <h2>Additional Information</h2>
      <form>
        <div>
          <label>Have you rented previously?</label>
          <input
            type="checkbox"
            name="rented_previously"
            checked={formValues.rented_previously}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Have you read the Rental Review?</label>
          <input
            type="checkbox"
            name="read_rental_review"
            checked={formValues.read_rental_review}
            onChange={handleChange}
          />
        </div>
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
        <div>
          <label>Agree to Respectful Use of Space</label>
          <input
            type="checkbox"
            name="agree_to_respectful_use_of_space"
            checked={formValues.agree_to_respectful_use_of_space}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agree to Invoice Payment Process</label>
          <input
            type="checkbox"
            name="agree_to_invoice_payment_process"
            checked={formValues.agree_to_invoice_payment_process}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPartThree;
