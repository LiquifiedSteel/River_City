/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useScript } from "../../hooks/useScript";
import { css } from "@emotion/react";
import axios from "axios";

// ===============================================
// ====== EMOTION STYLES FOR FORM COMPONENTS ======
// ===============================================

// === FORM CONTAINER ===
// Styles for the main form container, defining layout, background color, and visual appearance.
const formContainerStyle = css`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #205831; // Dark green background for contrast
  border-radius: 8px; // Rounded corners for modern design
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  color: #f8f8f8; // Light text for readability
`;

// === FORM LABELS ===
// Styles for form labels to ensure they are prominent and readable.
const labelStyle = css`
  font-weight: 600; // Bold font for emphasis
  margin-bottom: 5px; // Space between label and input
`;

// === FORM DESCRIPTIONS ===
// Styles for additional form descriptions or helper text.
const descriptionStyle = css`
  font-size: 0.9rem; // Slightly smaller font for secondary text
  color: #E6E6E6; // Subtle gray color to differentiate from primary text
`;

// === CHECKBOX ===
// Specific styles for checkboxes to enhance spacing and alignment.
const checkBox = css`
  margin-right: 4px; // Space between checkbox and label
`;

// === BUTTON STYLE ===
// Styles for buttons, including hover and focus states for better UX.
const buttonStyle = css`
  background-color: #ad9143; // Gold-like background for standout appearance
  color: #252525; // Dark text for good contrast
  font-weight: bold; // Emphasized text for actions
  border: none; // Removes default border for cleaner design
  border-radius: 4px; // Smooth rounded corners
  padding: 8px 16px; // Comfortable click area
  font-size: 0.9rem; // Medium font size for readability
  text-align: center; // Center text alignment
  cursor: pointer; // Indicates interactivity
  width: auto; // Dynamic width based on content
  max-width: 200px; // Limit button size
  transition: background-color 0.3s ease, transform 0.2s ease; // Smooth transitions

  &:hover {
    background-color: #8c7634; // Darker shade for hover effect
    transform: translateY(-2px); // Subtle lift for hover feedback
  }

  &:focus {
    outline: none; // Removes browser default outline
    box-shadow: 0px 0px 5px rgba(173, 145, 67, 0.5); // Glow effect for focus
  }
`;

// ===============================================
// ====== FORM PART TWO COMPONENT LOGIC ======
// ===============================================
const FormPartTwo = () => {
  // ====== HOOKS ======
  const dispatch = useDispatch(); // Redux dispatch for updating form state
  const history = useHistory(); // React Router history for navigation
  const formPartTwo = useSelector((state) => state.form.FormPartTwo); // Redux state for form part two
  const [teamPdf, setTeamPdf] = useState(""); // Stores the uploaded team PDF URL
  const [formValues, setFormValues] = useState(formPartTwo); // Local state for form values

  // ====== MOUNTING EFFECT ======
  useEffect(() => {
    document.title = "Rental Request Form"; // Updates the document title when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if(formPartTwo.team_pdf) {
      console.log("running", formPartTwo.team_pdf)
      setTeamPdf(formPartTwo.teamPdf);
    }
    console.log(teamPdf);
  }, []);

  // ====== EVENT HANDLERS ======

  // Handles input changes for text, select, and checkbox fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Updates form values dynamically
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validates and proceeds to the next form step
  const handleNext = () => {
    const dateFromTimestamp = new Date().getTime(); // Current timestamp
    const startDay = new Date(formValues.start_date).getTime(); // Start date timestamp

    // Ensure the start date is at least 5 days from the current date
    if (dateFromTimestamp < startDay - 432000000) {
      if (formValues.end_date < formValues.start_date) {
        alert("The end date of your event cannot be before the start date."); // Validation for date range
        return;
      } else {
        const updatedValues = { ...formValues, team_pdf: teamPdf }; // Append PDF URL to form data
        dispatch(updateFormPartTwo(updatedValues)); // Dispatch updated form data to Redux
        history.push("/form-part-three"); // Navigate to the next form part
      }
    } else {
      alert(
        "The Start Date of the event must be 5 or more days after the date you are submitting this request."
      ); // Validation for start date timing
      return;
    }
  };

  // Navigates back to the first form part
  const handleBack = () => {
    history.push("/form-part-one"); // Navigate back to the previous step
  };

  // Opens the Cloudinary widget for file upload
  const openWidget = (setter) => {
    if (window.cloudinary) {
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local"], // Restricts sources to local uploads
            cloudName: import.meta.env.VITE_CLOUDINARY_NAME, // Cloudinary account name
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // Upload preset for configuration
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setTeamPdf(result.info.secure_url); // Save uploaded file URL
              console.log(result); // Log the result for debugging
            }
          }
        )
        .open(); // Open the widget
    } else {
      console.error("Cloudinary widget is not loaded."); // Error handling for missing Cloudinary library
    }
  };

  // ====== COMPONENT RETURN ======
  return (
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Event Details</h2>

      <form onSubmit={handleNext}>
        <div className="mb-3">
          <label css={labelStyle}>Expected Attendance</label>
          <input
            type="number"
            name="expected_attendance"
            value={formValues.expected_attendance}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">

          <label css={labelStyle}>Start Date for Your Rental *</label>
          <input
            type="date"
            name="start_date"
            value={formValues.start_date}
            className="form-control"
            onChange={handleChange}
            required
          />
          <small css={descriptionStyle}>
            Example: September 15 to December 20 or March 15-May 14 (Must
            contain a date in MM/DD/YYYY format).
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>End Date for Your Rental *</label>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date}
            className="form-control"
            onChange={handleChange}
            required
          />
          <small css={descriptionStyle}>
            Example: September 15 to December 20 or March 15-May 14 (Must
            contain a date in MM/DD/YYYY format).
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>Additional Dates for Your Rental</label>
          <input
            type="text"
            name="additional_dates"
            value={formValues.additional_dates}
            className="form-control"
            onChange={handleChange}
          />
          <small css={descriptionStyle}>
            Submit when requesting specific dates or additional date details are
            needed.
          </small>
        </div>

        <div className="mb-3">
          <label css={labelStyle}>
            Are 85% of Your Participants West Fargo Students?
          </label>
          <input
          id="checkbox"
            type="checkbox"
            name="WF_students"
            checked={formValues.WF_students}
            className="form-check-input ms-2"
            onChange={handleChange}
            css={checkBox}
          />
          <small css={descriptionStyle}>
            An event comprising at least 85% of WFPS students is eligible for a
            student discount.
          </small>
        </div>
        {formValues.WF_students ? 
          <>
            <div className="mb-3 hide85">
              <label css={labelStyle}>Grade Level *</label>
              <input
                type="text"
                name="grade_level"
                value={formValues.grade_level}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 hide85">
              <label css={labelStyle}>
                Team Roster (Provide Student Name and School) *
              </label>

              {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
              <p className="userTextColor">
                File to upload:{" "}
                <button type="button" onClick={openWidget}>
                  Pick File
                </button>
              </p>

              {teamPdf ? 
                <p className="text-success mt-2">
                  Uploaded:{" "}
                  <a href={teamPdf} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </p>
                :
                formPartTwo.team_pdf && 
                  <p className="text-success mt-2">
                    Uploaded:{" "}
                    <a href={formPartTwo.team_pdf} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </p>
              }
              <small css={descriptionStyle}>
                A student discount is available if a roster meeting the requirements
                is provided.
              </small>
            </div>
          </>
          :
          <>
            <div className="mb-3 hide85 hide85True">
              <label css={labelStyle}>
                Team Roster (Provide Student Name and School) *
              </label>

              {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
              <p className="userTextColor">
                File to upload:{" "}
                <button type="button" onClick={openWidget}>
                  Pick File
                </button>
              </p>
            </div>
          </>
        }

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn"
            onClick={handleBack}
            css={buttonStyle}
          >
            Back
          </button>
          <button
            type="button"
            className="btn"
            onClick={handleNext}
            css={buttonStyle}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPartTwo;
