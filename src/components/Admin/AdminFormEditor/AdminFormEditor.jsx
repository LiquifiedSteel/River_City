import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment";

const AdminFormEditor = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const requestID = new URLSearchParams(location.search).get('requestID');

    const [formValues, setFormValues] = useState({});
    console.log(formValues);

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

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormValues({
          ...formValues,
          [name]: checked
            ? [...(formValues[name] || []), value]
            : formValues[name].filter((v) => v !== value),
        });
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
                        value={formValues.title_w_team_org_event}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.coach_contact_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formValues.coach_contact_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mailing Address</label>
                    <input
                        type="text"
                        name="mailingAddress"
                        value={formValues.renter_street_address}
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
                <div>
                    <label>Event Type</label>
                    <select
                        name="event_type"
                        value={formValues.event_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an Event Type</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Scouts">Scouts</option>
                        <option value="Dance">Dance</option>
                        <option value="Others">Other</option>
                    </select>
                </div>

                <div>
                    <label>Preferred Start Time</label>
                    <select
                        name="preferredTime_start"
                        value={formValues.preferred_time}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Start Time</option>
                        <option value="06:00:00">6:00 PM - 7:00 PM</option>
                        <option value="07:00:00">7:00 PM - 8:00 PM</option>
                        <option value="08:00:00">8:00 PM - 9:00 PM</option>
                        <option value="09:00:00">9:00 PM - 10:00 PM</option>
                    </select>
                </div>

                <div>
                    <label>Primary Location</label>
                    <select
                        name="preferred_location_primary"
                        value={formValues.preferred_location_primary}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Primary Location</option>
                        <option value={1}>School 1</option>
                        <option value={2}>School 2</option>
                    </select>
                </div>

                <div>
                    <label>Secondary Location</label>
                    <select
                        name="preferred_location_secondary"
                        value={formValues.preferred_location_secondary}
                        onChange={handleChange}
                    >
                        <option value="">Select Secondary Location</option>
                        <option value={1}>School 1</option>
                        <option value={2}>School 2</option>
                    </select>
                </div>

                <div>
                    <label>Preferred Space</label>
                    <div>
                        <label>
                            <select 
                                name="preferred_space"
                                value={formValues.preferred_space}
                                onChange={handleChange}>
                                <option value={1}>Meeting Room</option>
                                <option value={2}>Gymnasium</option>
                                <option value={3}>Classroom</option>
                                <option value={4}>Auditorium</option>
                                <option value={5}>Turf Field</option>
                            </select>
                            {/* <input
                                type="checkbox"
                                name="preferred_space"
                                value="Gymnasium"
                                checked={formValues.preferred_space?.includes("Gymnasium") || false}
                                onChange={handleCheckboxChange}
                            />
                            Gymnasium
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Commons"
                                checked={formValues.preferred_space?.includes("Commons") || false}
                                onChange={handleCheckboxChange}
                            />
                            Commons
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Library / Media Center"
                                checked={formValues.preferred_space?.includes("Library / Media Center") || false}
                                onChange={handleCheckboxChange}
                            />
                            Library / Media Center
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Locker Room"
                                checked={formValues.preferred_space?.includes("Locker Room") || false}
                                onChange={handleCheckboxChange}
                            />
                            Locker Room
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="preferred_space"
                                value="Turf Field"
                                checked={formValues.preferred_space?.includes("Turf Field") || false}
                                onChange={handleCheckboxChange}
                            />
                            Turf Field */}
                        </label>
                    </div>
                </div>

                {/* <div>
                    <label>Event Description</label>
                    <textarea
                        name="eventDescription"
                        value={formValues.eventDescription}
                        onChange={handleChange}
                        required
                    />
                </div> */}

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
                </div>

        
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formValues.start_date}
                        onChange={handleChange}
                        required
                    />
                    Currently: {moment(formValues.start_date).format("MMM Do YY")}
                </div>

                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formValues.end_date}
                        onChange={handleChange}
                        required
                    />
                    Currently: {moment(formValues.end_date).format("MMM Do YY")}
                </div>

                <div>
                    <label>Additional Dates</label>
                    <input
                        type="text"
                        name="additional_dates"
                        value={formValues.additional_dates}
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




      "rented_previously",
      "preferred_time",
      "priority",
      "85%_WF_students",
      "grade_level",
      "team_pdf",
      "read_rental_review",
      "renter_street_address",
      "renter_city",
      "renter_state",
      "renter_zip",
      "renter_phone",
      "renter_email",
      "agree_to_respectful_use_of_space",
      "agree_to_invoice_payment_process"