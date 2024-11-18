import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartThree, submitForm } from "../../redux/reducers/form.reducer";
import ReCAPTCHA from 'react-google-recaptcha';

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
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    dispatch(updateFormPartThree(formValues));
  };

  const handleBack = () => {
    history.push("/form-part-two");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("handleSubmit is running")
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA');
      return;
    }
    try {
      const response = await fetch('api/application/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recaptchaToken: recaptchaValue }),
      });
      
      const result = await response.json();
  
      if (result.success) {
        dispatch(submitForm({ formPartOne,  formPartTwo,  formPartThree}));
        history.push("/form-review");
        alert('successfull');
      } else {
        alert('reCAPTCHA verification failed.');
      }
    } catch (error) {
      console.error('Error during reCAPTCHA verification:', error);
    } 
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div>
      <h2>Additional Information</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Rental  Review
          The rental contract must be electronically signed by the client at least 5 business days in advance of the desired use date. The rental invoice must be electronically paid by the client at least 24 hours in advance of the desired use date in order to avoid cancellation of reservations and/or the rental contract. Use of a West Fargo Public Schools space will not be permitted without a signed contract.
          In the event a rental occurs on a day, time, or location not listed on the signed contract, a $50 fee will be charged to the renter. The renter utilizing the space will also be billed for the used space at 125% of the regular rate to account for unplanned overtime expenses. Discounted rates will not apply on non-contracted spaces used. 
          Cancellation of any event is permitted. In order to avoid a penalty, the cancellation notice must be received at least 24 hours in advance. After the second time the client does not notify the Facility Rental Program and does not arrive for a scheduled event, the entire contract will be terminated. Deviations from this guideline may be permitted by the Facility Rental Program.
          Once a rental contract is drafted, the only allowable changes are cancellations of confirmed dates. Any other change (date/time/location/equipment) must be done through the submission of a new application and will result in the loss of currently reserved space.
          If you have any questions contact Facility Rentals at facilityrentals@west-fargo.k12.nd.us
        </p>
        <div>
          <label>I have read the Rental Review</label>
          <input
            type="checkbox"
            name="read_rental_review"
            checked={formValues.read_rental_review}
            onChange={handleChange}
            required
          />
        </div>
        <p>Billing Information</p>
        <div>
          <label>Renter First Name</label>
          <input
            type="text"
            name="renter_first_name"
            value={formValues.renter_first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Renter Last Name</label>
          <input
            type="text"
            name="renter_last_name"
            value={formValues.renter_last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            name="renter_street_address"
            value={formValues.renter_street_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="renter_city"
            value={formValues.renter_city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="renter_state"
            value={formValues.renter_state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="renter_zip"
            value={formValues.renter_zip}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="renter_phone"
            value={formValues.renter_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="renter_email"
            value={formValues.renter_email}
            onChange={handleChange}
            required
          />
          <p>(no WFPS staff emails for private rentals)</p>
        </div>
        <p>As indicated in West Fargo Public Schools “Use of District Facilities for other than School Purposes – Guideline 9,” clients are expected to conduct activities and use the space(s) in a respectful and orderly manner. It is expected that all clients will show respect to the building, staff, equipment, and each other when utilizing the space for their contractual period.</p>
        <p>Specific examples of the expectations that need to be followed include, but are not limited to:</p>
        <ul>
          <li>Requesting any necessary equipment or set-up needs at time of application and adhering to a contract once it has been created and signed.</li>
          <li>Appropriate adult supervision of all children and participants.</li>
          <li>Refraining from bouncing, kicking, or passing balls in any area other than a gymnasium.</li>
          <li>Not attempting to alter the current state of the gymnasium bleachers upon arrival.</li>
          <li>Not impeding on other clients’ use of the space by arriving early, staying late, or invading any space that is in current use by another client.</li>
          <li>Occupying your designated space only for the time indicated on your contract - you cannot use any additional spaces or times other than what is listed on your contract.</li>
          <li>Not climbing on chairs, tables, shelves, or other structures that may prove dangerous or cause damage to school property.</li>
          <li>Recognizing that a space is being used by another client and providing them a comfortable and respectful level of space and noise to have a positive experience.</li>
          <li>Not impeding on the building staff’s district and facility-level responsibilities.</li>
          <li>Keeping exterior and interior doors closed at all times.</li>
          <li>Using appropriate volume levels.</li>
          <li>Picking-up any equipment you have been approved for use.</li>
          <li>Addressing spills, messes, and damages in a timely manner and with appropriate action.</li>
          <li>Speaking to all building occupants in a respectful tone, without the use of derogatory, insulting, or hateful language.</li>
          <li>Notifying the Facilities Rental Program at least 24 hours in advance of a cancellation.</li>
        </ul>
        <div>
          <label>Have you rented from West Fargo Public Schools before?</label>
          <input
            type="checkbox"
            name="rented_previously"
            checked={formValues.rented_previously}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>I have read and agree to abide by the respectful use of space guidelines</p>
          <label>I Agree</label>
          <input
            type="checkbox"
            name="agree_to_respectful_use_of_space"
            checked={formValues.agree_to_respectful_use_of_space}
            onChange={handleChange}
            required
          />
        </div>

        <p>Invoices will be issued within one business day of receiving your signed electronic rental contract and the invoice will be available to view in your online client portal. Payment must be submitted in full via credit card on your online client portal at least 24 hours prior to the start of your rental contract. If you need to pay via cash or check, special accommodation must be prearranged with the facility at least 48 hours prior to the start of your rental contract.</p>
        
        <div>
          <p>I have read and agree to the invoice payment process.</p>
          <label>I Agree</label>
          <input
            type="checkbox"
            name="agree_to_invoice_payment_process"
            checked={formValues.agree_to_invoice_payment_process}
            onChange={handleChange}
            required
          />
        </div>

        {/* Google reCAPTCHA Checkbox */}
        <div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}  // Site key goes here
            onChange={handleRecaptchaChange}
          />
        </div>

        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPartThree;
