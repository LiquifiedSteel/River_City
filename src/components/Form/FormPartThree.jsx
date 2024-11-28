/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  updateFormPartThree,
  submitForm,
} from "../../redux/reducers/form.reducer";
import ReCAPTCHA from "react-google-recaptcha";
import { css } from "@emotion/react";

// ===============================================
// ====== EMOTION STYLES FOR FORM COMPONENTS ======
// ===============================================

// === FORM CONTAINER ===
// Defines layout and appearance for the main form container.
const formContainerStyle = css`
  max-width: 900px; // Restricts the container width to 900px
  margin: 40px auto; // Centers the container with top/bottom margin
  padding: 20px; // Inner spacing for content
  background: #205831; // Green background for a clean, professional look
  border-radius: 8px; // Rounded corners for modern UI
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  color: #f8f8f8; // Light text for readability
`;

// === FORM LABELS ===
// Styles for form labels to make them prominent and readable.
const labelStyle = css`
  font-weight: 600; // Bold font weight for emphasis
  margin-bottom: 5px; // Space between the label and the input field
`;

// === FORM DESCRIPTIONS ===
// Styles for additional helper text or descriptions in the form.
const descriptionStyle = css`
  font-size: 0.9rem; // Slightly smaller font size for secondary text
  color: #E6E6E6; // Soft gray color to distinguish from primary text
`;

// === BUTTON STYLE ===
// Styles for buttons, including hover and focus effects.
const buttonStyle = css`
  background-color: #ad9143; // Warm gold color for visibility
  color: #252525; // Dark text for contrast
  font-weight: bold; // Bold text for emphasis
  border: none; // Removes default button border
  border-radius: 4px; // Rounded corners for a smoother look
  padding: 8px 16px; // Comfortable click area
  font-size: 0.9rem; // Medium font size for readability
  text-align: center; // Center-aligned button text
  cursor: pointer; // Pointer cursor for interactivity
  width: auto; // Dynamic width based on content
  max-width: 200px; // Restricts button size
  transition: background-color 0.3s ease, transform 0.2s ease; // Smooth transition effects

  &:hover {
    background-color: #8c7634; // Darker gold shade for hover effect
    transform: translateY(-2px); // Subtle lift effect on hover
  }

  &:focus {
    outline: none; // Removes browser default focus outline
    box-shadow: 0px 0px 5px rgba(173, 145, 67, 0.5); // Glow effect for focus
  }
`;

// ===============================================
// ====== FORM PART THREE COMPONENT LOGIC ========
// ===============================================
const FormPartThree = () => {
  // ====== HOOKS ======
  const dispatch = useDispatch(); // Redux dispatch to update form state
  const history = useHistory(); // React Router history for navigation
  const [recaptchaValue, setRecaptchaValue] = useState(null); // State for storing reCAPTCHA value
  const formPartThree = useSelector((state) => state.form.FormPartThree); // Redux state for form part three

  const [formValues, setFormValues] = useState(formPartThree); // Local state for form values

  // ====== MOUNTING EFFECT ======
  useEffect(() => {
    document.title = "Rental Request Form"; // Set the document title on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ====== EVENT HANDLERS ======

  // Handles input changes for text, select, and checkbox fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Dynamically updates form values based on input type
    const updatedValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormValues(updatedValues); // Update local form state
    dispatch(updateFormPartThree(updatedValues)); // Sync updated values to Redux
  };

  // Navigates back to the second form part
  const handleBack = () => {
    history.push("/form-part-two"); // Redirects to Form Part Two
  };

  // Validates reCAPTCHA and proceeds to the next step
  const handleEnter = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Ensures reCAPTCHA is completed
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA"); // Alert for missing reCAPTCHA
      return;
    }

    try {
      // Send reCAPTCHA token for server-side verification
      const response = await fetch("/api/application/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken: recaptchaValue }),
      });

      const result = await response.json();

      if (result.success) {
        history.push("/form-review"); // Navigate to form review on success
      } else {
        alert("reCAPTCHA verification failed."); // Alert for verification failure
      }
    } catch (error) {
      console.error("Error during reCAPTCHA verification:", error); // Log any errors
      alert("Failed Recaptcha"); // Alert for unexpected errors
    }
  };

  // Updates reCAPTCHA value when it changes
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Store reCAPTCHA value in state
  };

  // ====== COMPONENT RETURN ======
  return (
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Additional Information</h2>
      <form onSubmit={handleEnter}>
        {/* Rental Review */}
        <div className="mb-4">
          <p className={descriptionStyle}>
            The rental contract must be electronically signed at least 5
            business days before the desired use date. Payment must be made at
            least 24 hours before the event. Failure to comply may result in
            penalties or cancellations. Contact
            facilityrentals@west-fargo.k12.nd.us for questions.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="read_rental_review"
              id="readRentalReview"
              className="form-check-input"
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
          />
          <label htmlFor="rentedPreviously" className="form-check-label">
            I have rented before
          </label>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label css={labelStyle}>Renter First Name *</label>
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
            <label css={labelStyle}>Renter Last Name *</label>
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
          <label css={labelStyle}>Street Address *</label>
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
            <label css={labelStyle}>City *</label>
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
            <label css={labelStyle}>State *</label>
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
            <label css={labelStyle}>Zip Code *</label>
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
          <label css={labelStyle}>Phone Number *</label>
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
          <label css={labelStyle}>Email Address *</label>
          <input
            type="email"
            name="renter_email"
            className="form-control"
            value={formValues.renter_email}
            onChange={handleChange}
            required
          />
          <small css={descriptionStyle}>
            (No WFPS staff emails for private rentals.)
          </small>
        </div>

        {/* Respectful Use */}
        <div className="mb-4">
          <h4>Respectful Use of Space</h4>
          <p className={descriptionStyle}>
            By signing this agreement, you confirm adherence to respectful use
            guidelines. Failure to comply may result in penalties or
            cancellation.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="agree_to_respectful_use_of_space"
              id="agreeToRespectfulUse"
              className="form-check-input"
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
          Invoices will be issued within one business day of receiving your signed electronic rental contract and the invoice will
          be available to view in your online client portal. Payment must be submitted in full via credit card on your online
          client portal at least 24 hours prior to the start of your rental contract. If you need to pay via cash or check,
          special accommodation must be prearranged with the facility at least 48 hours prior to the start of your rental contract.
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              name="agree_to_invoice_payment_process"
              id="agreeToInvoice"
              className="form-check-input"
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
          <button
            type="button"
            className="btn"
            onClick={handleBack}
            css={buttonStyle}
          >
            Back
          </button>
          <button type="submit" className="btn" css={buttonStyle}>
            Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPartThree;
