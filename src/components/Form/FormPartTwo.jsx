import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartTwo } from "../../redux/reducers/form.reducer";

const FormPartTwo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartTwo = useSelector((state) => state.form.FormPartTwo);
  const [teamPdf, setTeamPdf] = useState("");
  const [liabilityProofPdf, setliabilityProofPdf] = useState("");

  const [formValues, setFormValues] = useState(formPartTwo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNext = () => {
    const updatedValues = { ...formValues, team_pdf: teamPdf, liabilityProof: liabilityProofPdf };
    dispatch(updateFormPartTwo(updatedValues));
    history.push("/form-part-three");
  };

  const handleBack = () => {
    history.push("/form-part-one");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setTeamPdf(file); // ====== Save the file locally ======
  };

  const handleFileUpload2 = (e) => {
    const file = e.target.files[0];
    setliabilityProofPdf(file); // ====== Save the file locally ======
  };

  return (
    <div>
      <h2>Event Details</h2>
      <form>
        <div>
          <label>Event Description</label>
          <textarea
            name="eventDescription"
            value={formValues.eventDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Expected Attendance</label>
          <input
            type="number"
            name="expected_attendance"
            value={formValues.expected_attendance}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Preferred Days</label>
          <select
              name="preferred_days"
              value={formValues.preferred_days}
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
          <span> Requests for twice-weekly practices and meetings will be reserved on Mon/Thur or Tue/Fri</span>
        </div>

        <div>
          <label>Start Date for your rental</label>
          <input
            type="date"
            name="start_date"
            value={formValues.start_date}
            onChange={handleChange}
            required
          />
          <span>Example: September 15 to December 20 or March 15-May 14 (Must contain a date in M/D/YYYY format)</span>
        </div>

        <div>
          <label>End Date for your rental</label>
          <input
            type="date"
            name="end_date"
            value={formValues.end_date}
            onChange={handleChange}
            required
          />
          <span>Example: September 15 to December 20 or March 15-May 14 (Must contain a date in M/D/YYYY format)</span>
        </div>

        <div>
          <label>Additional Dates for your rental</label>
          <input
            type="text"
            name="additional_dates"
            value={formValues.additional_dates}
            onChange={handleChange}
          />
          <span>Submit when requesting specific dates or additional date details are needed</span>
        </div>
        <div>
          <label>Are your participants consisting of 85% West Fargo students? An event comprising at least 85% of WFPS students is eligible to receive a student discount for two 60-minute contracted slots with the required student roster. (Not eligible for weekend or large event rentals.)</label>
          <input
            type="checkbox"
            name="WF_students"
            checked={formValues.WF_students}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Grade Level</label>
          <input
            type="text"
            name="grade_level"
            value={formValues.grade_level}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Team Roster: Provide Student Name and School. Please provide a roster when submitting your application to prevent delays in processing. (A student discount is available to applicants who meet the WFPS student participant requirements). If a roster is not submitted, the regular rate will apply and changes will not be made once the invoice is sent.</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="team_pdf"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label>Liability Proof</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="liabilityProof"
            onChange={handleFileUpload2}
          />
        </div>
        {/* <div>
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            value={formValues.specialRequests}
            onChange={handleChange}
          />
        </div> */}
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartTwo;
