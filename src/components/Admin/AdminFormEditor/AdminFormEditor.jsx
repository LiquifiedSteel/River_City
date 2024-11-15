import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AdminFormEditor = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const requestID = new URLSearchParams(location.search).get('requestID');

    const [formValues, setFormValues] = useState({});

    useEffect( () => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`/api/application/${requestID}`);
                setFormValues(response.data[0]);
            } catch (error) {
                console.error("Error fetching request:", error);
            }
        };
    
        fetchRequest();
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleNext = () => {
        dispatch(updateFormPartOne(formValues));
        history.push("/form-part-two");
    };

    return !formValues ? null : (
        <div>
            <h2>Applicant Information</h2>
            <form>
                <div>
                    <label>Coach's First Name</label>
                    <input
                        type="text"
                        name="coachFirstName"
                        value={formValues.coach_contact_first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Coach's Last Name</label>
                    <input
                        type="text"
                        name="coachLastName"
                        value={formValues.coach_contact_last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Renter's First Name</label>
                    <input
                        type="text"
                        name="renterFirstName"
                        value={formValues.renter_first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Renter's Last Name</label>
                    <input
                        type="text"
                        name="renterLastName"
                        value={formValues.renter_last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Organization Name (if applicable)</label>
                    <input
                        type="text"
                        name="organizationName"
                        value={formValues.team_org_event}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mailing Address</label>
                    <input
                        type="text"
                        name="mailingAddress"
                        value={formValues.mailingAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Website</label>
                    <input
                        type="url"
                        name="website"
                        value={formValues.website}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleNext}>
                    Next
                </button>
            </form>
        </div>
    );
};


export default AdminFormEditor;



      "team_org_event", 
      "title_w_team_org_event",
      "coach_contact_last_name",
      "coach_contact_email",
      "coach_contact_phone",
      "website",
      "event_type",
      "rented_previously",
      "preferred_time",
      "preferred_location_primary",
      "preferred_location_secondary",
      "preferred_space",
      "priority",
      "preferred_days",
      "start_date",
      "end_date",
      "additional_dates",
      "expected_attendance",
      "85%_WF_students",
      "grade_level",
      "team_pdf",
      "read_rental_review",
      "",
      "",
      "renter_street_address",
      "renter_city",
      "renter_state",
      "renter_zip",
      "renter_phone",
      "renter_email",
      "agree_to_respectful_use_of_space",
      "agree_to_invoice_payment_process"