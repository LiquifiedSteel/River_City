/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../redux/reducers/form.reducer";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import jsPDF from "jspdf";
import { useState } from "react";
const containerStyle = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
`;

const cardStyle = css`
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const sectionTitleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #343a40;
`;

const fieldStyle = css`
  margin-bottom: 10px;

  span {
    font-weight: bold;
  }
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ReviewPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formState = useSelector((state) => state.form);
  const [heading, setHeading] = useState("Review Your Submission");
  const [request, setRequest] = useState({});
  const [locations, setLocations] = useState([]);

  const handleSubmit = () => {
    dispatch(
      submitForm({
        formPartOne: formState.FormPartOne,
        formPartTwo: formState.FormPartTwo,
        formPartThree: formState.FormPartThree,
      })
    );
    history.push("/submission-success");
  };

  const generatePdfContent = (doc) => {
    let yPosition = 10;
    const lineHeight = 10;

    doc.text(heading, 10, yPosition);
    yPosition += lineHeight;

    const fields = [
      ["Team/Organization/Event", request.team_org_event],
      ["Title with Team/Organization/Event", request.title_w_team_org_event],
      [
        "Coach/Contact Name",
        `${request.coach_contact_first_name || ""} ${
          request.coach_contact_last_name || ""
        }`,
      ],
      ["Coach/Contact Email", request.coach_contact_email],
      ["Coach/Contact Phone", request.coach_contact_phone],
      ["Website", request.website],
      ["Event Type", request.event_type],
      ["Preferred Time", request.preferred_time],
      ["Preferred Location", request.preferred_location_primary],
      ["Preferred Space", request.preferred_space],
      ["Priority", request.priority],
      ["Event Description", request.event_description],
      ["Expected Attendance", request.expected_attendance],
      ["Preferred Days", request.preferred_days],
      ["Start Date", request.start_date],
      ["End Date", request.end_date],
      ["Additional Dates", request.additional_dates],
      ["West Fargo Students?", request.wf_students ? "Yes" : "No"],
      ["Grade Level", request.grade_level],
      ["Team Roster", request.team_pdf],
      [
        "Renter Name",
        `${request.renter_first_name || ""} ${request.renter_last_name || ""}`,
      ],
      ["Renter Address", request.renter_street_address],
      ["Renter City", request.renter_city],
      ["Renter State", request.renter_state],
      ["Renter ZIP", request.renter_zip],
      ["Renter Phone", request.renter_phone],
      ["Renter Email", request.renter_email],
      ["Special Requests", request.special_requests],
      ["Rented Previously", request.rented_previously ? "Yes" : "No"],
      [
        "Respectful Use of Space Agreement",
        request.agree_to_respectful_use_of_space ? "Yes" : "No",
      ],
      [
        "Invoice Payment Agreement",
        request.agree_to_invoice_payment_process ? "Yes" : "No",
      ],
    ];

    fields.forEach(([label, value]) => {
      doc.text(`${label}: ${value || "N/A"}`, 10, yPosition);
      yPosition += lineHeight;
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    generatePdfContent(doc);
    doc.save("AdminDataView.pdf");
  };

  return (
    <div css={containerStyle} className="shadow">
      <h2 className="text-center mb-4">Review Your Submission</h2>

      {/* Part One */}
      <div css={cardStyle}>
        <h3 css={sectionTitleStyle}>Part One: Team/Organization Details</h3>
        <div css={fieldStyle}>
          <span>Event Name:</span> {formState.FormPartOne.team_org_event}
        </div>
        <div css={fieldStyle}>
          <span>Title with Team/Event:</span>{" "}
          {formState.FormPartOne.title_w_team_org_event}
        </div>
        <div css={fieldStyle}>
          <span>Coach First Name:</span>{" "}
          {formState.FormPartOne.coach_contact_first_name}
        </div>
        <div css={fieldStyle}>
          <span>Coach Last Name:</span>{" "}
          {formState.FormPartOne.coach_contact_last_name}
        </div>
        <div css={fieldStyle}>
          <span>Coach Email:</span> {formState.FormPartOne.coach_contact_email}
        </div>
        <div css={fieldStyle}>
          <span>Coach Phone:</span> {formState.FormPartOne.coach_contact_phone}
        </div>
        <div css={fieldStyle}>
          <span>Website:</span> {formState.FormPartOne.website}
        </div>
        <div css={fieldStyle}>
          <span>Event Type:</span> {formState.FormPartOne.event_type}
        </div>
        <div css={fieldStyle}>
          <span>Preferred Start Time:</span>{" "}
          {formState.FormPartOne.preferred_time}
        </div>
        <div css={fieldStyle}>
          <span>Primary Location:</span>{" "}
          {formState.FormPartOne.preferred_location_primary}
        </div>
        <div css={fieldStyle}>
          <span>Secondary Location:</span>{" "}
          {formState.FormPartOne.preferred_location_secondary}
        </div>
        <div css={fieldStyle}>
          <span>Preferred Space:</span>{" "}
          {formState.FormPartOne.preferred_space.join(", ")}
        </div>
        <div css={fieldStyle}>
          <span>Priority:</span> {formState.FormPartOne.priority}
        </div>
      </div>

      {/* Part Two */}
      <div css={cardStyle}>
        <h3 css={sectionTitleStyle}>Part Two: Event Details</h3>
        <div css={fieldStyle}>
          <span>Event Description:</span> {formState.FormPartTwo.event_description}
        </div>
        <div css={fieldStyle}>
          <span>Expected Attendance:</span>{" "}
          {formState.FormPartTwo.expected_attendance}
        </div>
        <div css={fieldStyle}>
          <span>Grade Level:</span> {formState.FormPartTwo.grade_level}
        </div>
        <div css={fieldStyle}>
          <span>Team PDF:</span>{" "}
          {formState.FormPartTwo.team_pdf
            ? formState.FormPartTwo.team_pdf.name || "Uploaded"
            : "Not Uploaded"}
        </div>
        <div css={fieldStyle}>
          <span>WF Students:</span>{" "}
          {formState.FormPartTwo.WF_students ? "Yes" : "No"}
        </div>
      </div>

      {/* Part Three */}
      <div css={cardStyle}>
        <h3 css={sectionTitleStyle}>Part Three: Additional Information</h3>
        <div css={fieldStyle}>
          <span>Liability Proof:</span>{" "}
          {formState.FormPartThree.liabilityProof || "N/A"}
        </div>
        <div css={fieldStyle}>
          <span>Special Requests:</span>{" "}
          {formState.FormPartThree.specialRequests || "N/A"}
        </div>
        <div css={fieldStyle}>
          <span>Rented Previously:</span>{" "}
          {formState.FormPartThree.rented_previously ? "Yes" : "No"}
        </div>
        <div css={fieldStyle}>
          <span>Read Rental Review:</span>{" "}
          {formState.FormPartThree.read_rental_review ? "Yes" : "No"}
        </div>
        <div css={fieldStyle}>
          <span>Renter First Name:</span>{" "}
          {formState.FormPartThree.renter_first_name}
        </div>
        <div css={fieldStyle}>
          <span>Renter Last Name:</span>{" "}
          {formState.FormPartThree.renter_last_name}
        </div>
        <div css={fieldStyle}>
          <span>Street Address:</span>{" "}
          {formState.FormPartThree.renter_street_address}
        </div>
        <div css={fieldStyle}>
          <span>City:</span> {formState.FormPartThree.renter_city}
        </div>
        <div css={fieldStyle}>
          <span>State:</span> {formState.FormPartThree.renter_state}
        </div>
        <div css={fieldStyle}>
          <span>Zip Code:</span> {formState.FormPartThree.renter_zip}
        </div>
        <div css={fieldStyle}>
          <span>Phone Number:</span> {formState.FormPartThree.renter_phone}
        </div>
        <div css={fieldStyle}>
          <span>Email:</span> {formState.FormPartThree.renter_email}
        </div>
        <div css={fieldStyle}>
          <span>Agree to Respectful Use of Space:</span>{" "}
          {formState.FormPartThree.agree_to_respectful_use_of_space
            ? "Yes"
            : "No"}
        </div>
        <div css={fieldStyle}>
          <span>Agree to Invoice Payment Process:</span>{" "}
          {formState.FormPartThree.agree_to_invoice_payment_process
            ? "Yes"
            : "No"}
        </div>
      </div>

      <div css={buttonGroupStyle}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/form-part-three")}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
        >
          Download PDF
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
