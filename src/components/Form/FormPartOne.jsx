// src/components/Form/FormPartOne.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";
import axios from "axios";

const FormPartOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartOne = useSelector((state) => state.form.FormPartOne);
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [locations, setLocations] = useState([]);
  const [formValues, setFormValues] = useState(formPartOne);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`/api/application/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLocation1 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setLocation1(Number(value));
  };

  const handleLocation2 = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setLocation2(Number(value));
  };

  const handleNext = () => {
    dispatch(updateFormPartOne(formValues));
    history.push("/form-part-two");
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

  return (
    <div>
      <h2>Applicant Information</h2>
      <form>
      <p>Rental Information</p>

      <p>West Fargo Public Schools makes its elementary, middle, and high school facilities available for public use, with some exceptions to availability. ( see full Regulations- Applications & Rental Contracts for School Building 1)</p>

      <p>All clients must submit a rental application to the Facilities Rental Program for the use of a school facility at least five business days in advance of the desired use date(s). Team/organization rosters must be submitted in conjunction with an application if an organization feels they may be eligible for the WFPS student discount (see Regulations – Fee Structure 5B).</p>

      <p>Applications may be referred to another school facility if the requested facility is unavailable or inappropriate for the purposes of the requesting client.
        Use of the facilities shall not be permitted to interfere with the operation of the schools or with school activities. School-sponsored activities always take precedence, even when scheduled after the signing of a facility rental contract.</p>

      <p>Once the application has been approved by all appropriate parties within the district, a rental contract will be issued, and the event will be added to the appropriate district calendar(s).</p>

      <p>Use of the facilities by clients is automatically cancelled when schools must be closed due to inclement weather or other conditions.</p>

      <p>Review the complete Facility Rental Policy located on our Facility Rental Website or on your contract</p>

      <div>
          <label>Name for Team/ Organization/ Event(sport teams require an identifiable team name and can cause delays in processing if not provided during submission) We cannot accept team names of our local sport teams. (Packers, Mustangs, Hawks, Bison, etc.)</label>
          <input
            type="text"
            name="team_org_event"
            value={formValues.team_org_event}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Title with Team/ Organization/ Event</label>
          <input
            type="text"
            name="title_w_team_org_event"
            value={formValues.title_w_team_org_event}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Coach/Contact's First Name</label>
          <input
            type="text"
            name="coach_contact_first_name"
            value={formValues.coach_contact_first_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Coach/Contact's Last Name</label>
          <input
            type="text"
            name="coach_contact_last_name"
            value={formValues.coach_contact_last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Coach/ Contact Personal Email</label>
          <input
            type="email"
            name="coach_contact_email"
            value={formValues.coach_contact_email}
            onChange={handleChange}
            required
          />
          <span>(no WFPS staff emails for private rentals)</span>
        </div>

        <div>
          <label>Coach/ Contact Personal Phone Number</label>
          <input
            type="tel"
            name="coach_contact_phone"
            value={formValues.coach_contact_phone}
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
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Preferred Time: by the hour, no half hour sessions allowed</label>
          <select
            name="preferred_time"
            value={formValues.preferred_time}
            onChange={handleChange}
            required
          >
            <option value="">Select Start Time</option>
            <option value="6:00 PM">6:00 PM - 7:00 PM (Elementary School Only)</option>
            <option value="7:00 PM">7:00 PM - 8:00 PM (Elementary School Only)</option>
            <option value="8:00 PM">8:00 PM - 9:00 PM (Elementary & Middle School)</option>
            <option value="9:00 PM">9:00 PM - 10:00 PM (Middle School Only)</option>
          </select>
          <span> Elem schools are only available from 6PM - 9PM Middle schools are only available from 8pm-10pm</span>
        </div>

        <div>
          <label>Preferred Location: First Option</label>
          <select
            name="preferred_location_primary"
            value={formValues.preferred_location_primary}
            onChange={handleLocation1}
            required
          >
            <option value={null}>Select Primary Location</option>
            {locations.filter((location)=>Number(location2) !== Number(location.id)).map(location =><option key={location.id} value={location.id}>{location.name_of_Location}</option>)}
          </select>
          <span> SHS, WFHS, and HHS are unavailable on weekdays. Lodoen Community Center is unavailable for public</span>
        </div>

        <div>
          <label>Preferred Location: Second Option</label>
          <select
            name="preferred_location_secondary"
            value={formValues.preferred_location_secondary}
            onChange={handleLocation2}
          >
            <option value={null}>Select Secondary Location</option>
            {locations.filter((location)=>Number(location1) !== Number(location.id)).map(location =><option key={location.id} value={location.id}>{location.name_of_Location}</option>)}
          </select>
          <span> SHS, WFHS, and HHS are unavailable on weekdays. Lodoen Community Center is unavailable for public</span>
        </div>

        <div>
          <label>Preferred Space</label>
          <div>
            <label>
              <input
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
              Turf Field
            </label>
            <p>Only one gym court is available at each of our Elem schools; MS have up to three. Select 1-5</p>
          </div>
        </div>

        <div>
          <label>Priority for event(s) scheduling:</label>
          <select
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            required
          > 
            <option value="Time">Preferred Time</option>
            <option value="Days">Preferred Days</option>
            <option value="Location">Preferred Location</option>
          </select>
          <span> What is most important when scheduling your event? (ex Mondays or Tue/Fridays, 6-7pm, or Legacy)</span>
        </div>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
