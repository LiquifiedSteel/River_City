import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../redux/reducers/form.reducer";
import { useHistory } from "react-router-dom";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formState = useSelector((state) => state.form);

  const handleSubmit = () => {
    dispatch(submitForm());
    history.push("/submission-success");
  };

  return (
    <div>
      <h2>Review Your Submission</h2>

      <h3>Part One: Team/Organization Details</h3>
      <ul>
        <li>Event Name: {formState.FormPartOne.team_org_event}</li>
        <li>Title with Team/Event: {formState.FormPartOne.title_w_team_org_event}</li>
        <li>Coach First Name: {formState.FormPartOne.coach_contact_first_name}</li>
        <li>Coach Last Name: {formState.FormPartOne.coach_contact_last_name}</li>
        <li>Coach Email: {formState.FormPartOne.coach_contact_email}</li>
        <li>Coach Phone: {formState.FormPartOne.coach_contact_phone}</li>
        <li>Website: {formState.FormPartOne.website}</li>
        <li>Event Type: {formState.FormPartOne.event_type}</li>
        <li>Preferred Start Time: {formState.FormPartOne.preferred_time}</li>
        <li>Primary Location: {formState.FormPartOne.preferred_location_primary}</li>
        <li>Secondary Location: {formState.FormPartOne.preferred_location_secondary}</li>
        <li>Preferred Space: {formState.FormPartOne.preferred_space.join(", ")}</li>
        <li>Priority: {formState.FormPartOne.priority}</li>
      </ul>

      <h3>Part Two: Event Details</h3>
      <ul>
        <li>Event Description: {formState.FormPartTwo.eventDescription}</li>
        <li>Expected Attendance: {formState.FormPartTwo.expected_attendance}</li>
        <li>Grade Level: {formState.FormPartTwo.grade_level}</li>
        <li>Team PDF: {formState.FormPartTwo.team_pdf ? formState.FormPartTwo.team_pdf.name || "Uploaded" : "Not Uploaded"}</li>
        <li>WF Students: {formState.FormPartTwo.WF_students ? "Yes" : "No"}</li>
      </ul>

      <h3>Part Three: Additional Information</h3>
      <ul>
        <li>Liability Proof: {formState.FormPartThree.liabilityProof}</li>
        <li>Special Requests: {formState.FormPartThree.specialRequests}</li>
        <li>Rented Previously: {formState.FormPartThree.rented_previously ? "Yes" : "No"}</li>
        <li>Read Rental Review: {formState.FormPartThree.read_rental_review ? "Yes" : "No"}</li>
        <li>Renter First Name: {formState.FormPartThree.renter_first_name}</li>
        <li>Renter Last Name: {formState.FormPartThree.renter_last_name}</li>
        <li>Street Address: {formState.FormPartThree.renter_street_address}</li>
        <li>City: {formState.FormPartThree.renter_city}</li>
        <li>State: {formState.FormPartThree.renter_state}</li>
        <li>Zip Code: {formState.FormPartThree.renter_zip}</li>
        <li>Phone Number: {formState.FormPartThree.renter_phone}</li>
        <li>Email: {formState.FormPartThree.renter_email}</li>
        <li>Agree to Respectful Use of Space: {formState.FormPartThree.agree_to_respectful_use_of_space ? "Yes" : "No"}</li>
        <li>Agree to Invoice Payment Process: {formState.FormPartThree.agree_to_invoice_payment_process ? "Yes" : "No"}</li>
      </ul>

      <button onClick={() => history.push("/form-part-three")}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReviewPage;
