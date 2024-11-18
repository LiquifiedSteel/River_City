/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartThree, submitForm } from "../../redux/reducers/form.reducer";
import ReCAPTCHA from "react-google-recaptcha";
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

const FormPartThree = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const formPartThree = useSelector((state) => state.form.FormPartThree);
  const formPartTwo = useSelector((state) => state.form.FormPartTwo);
  const formPartOne = useSelector((state) => state.form.FormPartOne);

  const [formValues, setFormValues] = useState(formPartThree);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    const updatedValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };
  
    setFormValues(updatedValues);
  
    dispatch(updateFormPartThree(updatedValues));
  };
  

  const handleBack = () => {
    history.push("/form-part-two");
  };

  const handleEnter = async (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    try {
        const response = await fetch("/api/application/verify-recaptcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recaptchaToken: recaptchaValue }),
          });

      const result = await response.json();

      if (result.success) {
        dispatch(submitForm({ formPartOne,  formPartTwo,  formPartThree }));
        history.push("/form-review");
      } else {
        alert("reCAPTCHA verification failed.");
      }
    } catch (error) {
      console.error("Error during reCAPTCHA verification:", error);
      alert("Failed Recaptcha");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Additional Information</h2>
      <form onSubmit={handleEnter}>
        {/* Rental Review */}
        <div className="mb-4">
          <p className={descriptionStyle}>
            The rental contract must be electronically signed at least 5 business days
            before the desired use date. Payment must be made at least 24 hours before the
            event. Failure to comply may result in penalties or cancellations. Contact
            facilityrentals@west-fargo.k12.nd.us for questions.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="read_rental_review"
              id="readRentalReview"
              className="form-check-input"
              checked={formValues.read_rental_review}
              onChange={handleChange}
              required
            />
            <label htmlFor="readRentalReview" className="form-check-label">
              I have read the Rental Review
            </label>
          </div>
        </div>

        {/* Billing Information */}
        <h4 className="mb-3">Billing Information</h4>
        <div className="form-check">
            <input
              type="checkbox"
              name="rented_previously"
              id="rentedPreviously"
              className="form-check-input"
              checked={formValues.rented_previously}
              onChange={handleChange}
              required
            />
            <label htmlFor="rentedPreviously" className="form-check-label">
              I have read rented before
            </label>
          </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label css={labelStyle}>Renter First Name</label>
            <input
              type="text"
              name="renter_first_name"
              className="form-control"
              value={formValues.renter_first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label css={labelStyle}>Renter Last Name</label>
            <input
              type="text"
              name="renter_last_name"
              className="form-control"
              value={formValues.renter_last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label css={labelStyle}>Street Address</label>
          <input
            type="text"
            name="renter_street_address"
            className="form-control"
            value={formValues.renter_street_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label css={labelStyle}>City</label>
            <input
              type="text"
              name="renter_city"
              className="form-control"
              value={formValues.renter_city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label css={labelStyle}>State</label>
            <input
              type="text"
              name="renter_state"
              className="form-control"
              value={formValues.renter_state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label css={labelStyle}>Zip Code</label>
            <input
              type="text"
              name="renter_zip"
              className="form-control"
              value={formValues.renter_zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label css={labelStyle}>Phone Number</label>
          <input
            type="tel"
            name="renter_phone"
            className="form-control"
            value={formValues.renter_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label css={labelStyle}>Email Address</label>
          <input
            type="email"
            name="renter_email"
            className="form-control"
            value={formValues.renter_email}
            onChange={handleChange}
            required
          />
          <small css={descriptionStyle}>(No WFPS staff emails for private rentals.)</small>
        </div>

        {/* Respectful Use */}
        <div className="mb-4">
          <h4>Respectful Use of Space</h4>
          <p className={descriptionStyle}>
            By signing this agreement, you confirm adherence to respectful use guidelines.
            Failure to comply may result in penalties or cancellation.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="agree_to_respectful_use_of_space"
              id="agreeToRespectfulUse"
              className="form-check-input"
              checked={formValues.agree_to_respectful_use_of_space}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToRespectfulUse" className="form-check-label">
              I agree to the respectful use of space guidelines
            </label>
          </div>
        </div>

        {/* Invoice Agreement */}
        <div className="mb-4">
          <h4>Invoice Agreement</h4>
          <p className={descriptionStyle}>
            Invoices must be paid in full at least 24 hours before the start of your rental
            period. Special accommodations for cash or check payments must be arranged in
            advance.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="agree_to_invoice_payment_process"
              id="agreeToInvoice"
              className="form-check-input"
              checked={formValues.agree_to_invoice_payment_process}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToInvoice" className="form-check-label">
              I agree to the invoice payment process
            </label>
          </div>
        </div>

        {/* Google reCAPTCHA */}
        <div className="mb-4">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPartThree;
