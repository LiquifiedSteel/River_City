import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartThree, submitForm } from "../../redux/reducers/form.reducer";

const FormPartThree = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartThree = useSelector((state) => state.form.FormPartThree);

  const [formValues, setFormValues] = useState(formPartThree);
  const [teamPdf, setTeamPdf] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setTeamPdf(file); // ====== Save the file locally ======
  };

  const handleBack = () => {
    history.push("/form-part-two");
  };

  const handleSubmit = () => {
    const updatedValues = { ...formValues, team_pdf: teamPdf };
    dispatch(updateFormPartThree(updatedValues));
    dispatch(submitForm());
    history.push("/submission-success"); 
  };

  return (
    <div>
      <h2>Additional Information</h2>
      <form>
        <div>
          <label>Are you including WF Students?</label>
          <input
            type="checkbox"
            name="wf_students"
            checked={formValues.wf_students}
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
          <label>Upload Team PDF</label>
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
            type="text"
            name="liabilityProof"
            value={formValues.liabilityProof}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            value={formValues.specialRequests}
            onChange={handleChange}
          />
        </div>
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
            name="read_Rental_Review"
            checked={formValues.read_Rental_Review}
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
            name="agreeToRespectfulUseOfSpace"
            checked={formValues.agreeToRespectfulUseOfSpace}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agree to Invoice Payment Process</label>
          <input
            type="checkbox"
            name="agreeToInvoicePaymentProcess"
            checked={formValues.agreeToInvoicePaymentProcess}
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
