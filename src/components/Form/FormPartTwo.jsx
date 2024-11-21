/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useScript } from "../../hooks/useScript";
import { updateFormPartTwo } from "../../redux/reducers/form.reducer";
import { css } from "@emotion/react";
import axios from "axios";

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
  color: #6c757d;
`;

const FormPartTwo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartTwo = useSelector((state) => state.form.FormPartTwo);
  const [teamPdf, setTeamPdf] = useState("");
  const [formValues, setFormValues] = useState(formPartTwo);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "WF_students") {
      let elements = document.querySelectorAll(".hide85");
      for (let element of elements) {
        element.classList.toggle("hide85True");
      }
    }
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    const dateFromTimestamp = new Date().getTime(); // grabs the timestamp for right now
    const startDay = new Date(formValues.start_date).getTime(); // grabs the timestamp for the chosen start_date

    if (dateFromTimestamp < startDay - 432000000) {
      if (formValues.end_date < formValues.start_date) {
        alert("The end date of your event cannot be before the start date.");
        return;
      } else {
        const updatedValues = { ...formValues, team_pdf: teamPdf };
        dispatch(updateFormPartTwo(updatedValues));
        history.push("/form-part-three");
      }
    } else {
      alert(
        "The Start Date of the event must be 5 or more days after the date you are submitting this request."
      );
      return;
    }
  };

  const handleBack = () => {
    history.push("/form-part-one");
  };

  const openWidget = (setter) => {
    if (window.cloudinary) {
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local"],
            cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setTeamPdf(result.info.secure_url);
              console.log(result);
            }
          }
        )
        .open();
    } else {
      console.error("Cloudinary widget is not loaded.");
    }
  };

  return (
    <div css={formContainerStyle} className="shadow">
      <h2 className="text-center mb-4">Event Details</h2>

      <form onSubmit={handleNext}>
        <div className="mb-3">
          <label css={labelStyle}>Event Description</label>
          <textarea
            name="event_description"
            value={formValues.event_description}
            className="form-control"
            onChange={handleChange}
          />
        </div>

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
            Requests for twice-weekly practices and meetings will be reserved on
            Mon/Thur or Tue/Fri.
          </small>
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
            type="checkbox"
            name="WF_students"
            checked={formValues.WF_students}
            className="form-check-input ms-2"
            onChange={handleChange}
          />
          <small css={descriptionStyle}>
            An event comprising at least 85% of WFPS students is eligible for a
            student discount.
          </small>
        </div>

        <div className="mb-3 hide85 hide85True">
          <label css={labelStyle}>Grade Level *</label>
          <input
            type="text"
            name="grade_level"
            value={formValues.grade_level}
            className="form-control"
            onChange={handleChange}
          />
        </div>

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

          {teamPdf && (
            <p className="text-success mt-2">
              Uploaded:{" "}
              <a href={teamPdf} target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </p>
          )}
          <small css={descriptionStyle}>
            A student discount is available if a roster meeting the requirements
            is provided.
          </small>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPartTwo;
