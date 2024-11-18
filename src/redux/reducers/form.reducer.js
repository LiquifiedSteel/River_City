// ====== Initial State ======
const initialState = {
  FormPartOne: {
    team_org_event: "",
    title_w_team_org_event: "",
    coach_contact_first_name: "",
    coach_contact_last_name: "",
    coach_contact_email: "",
    coach_contact_phone: "",
    website: "",
    event_type: "", //Basketball, Volleyball, Scouts, Dance, Other
    preferred_time: "", // Will be a timestamp 6:00 PM -7:00 PM (Elementary School Only) 7:00 PM- 8:00 PM (Elementary School Only) 8:00 PM- 9:00 PM (Elementary & Middle School) 9:00 PM- 10:00 PM (Middle School Only)
    preferred_location_primary: 0, // random two schools for testing
    preferred_location_secondary: 0, // random two schools for testing
    preferred_space: [], // Gymnasium, Commons, Library / Media Center, Locker Room, Turf Field
    priority: "", // might change to an integer based on what functionality we choose to do Preferred Time, Preferred Days, Preferred Location
  },
  FormPartTwo: {
    event_description: "", //
    expected_attendance: "",
    preferred_days: "", // Monday/ Thursdays, Tuesday/ Fridays, Mondays, Tuesdays, Thursdays, Fridays
    start_date: "", // Will be a date
    end_date: "", // Will be a date
    additional_dates: "", // text field
    WF_students: false,
    grade_level: "",
    team_pdf: "",
  },
  FormPartThree: {
    renter_first_name: "",
    renter_last_name: "",
    renter_street_address: "",
    renter_city: "",
    renter_state: "",
    renter_zip: "",
    renter_phone: "",
    renter_email: "",
  },
};

// ====== Action Types ======
const UPDATE_FORM_PART_ONE = "UPDATE_FORM_PART_ONE";
const UPDATE_FORM_PART_TWO = "UPDATE_FORM_PART_TWO";
const UPDATE_FORM_PART_THREE = "UPDATE_FORM_PART_THREE";
const SUBMIT_FORM = "SUBMIT_FORM";

// ====== Reducer ======
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_PART_ONE:
      return {
        ...state,
        FormPartOne: { ...state.FormPartOne, ...action.payload },
      };
    case UPDATE_FORM_PART_TWO:
      return {
        ...state,
        FormPartTwo: { ...state.FormPartTwo, ...action.payload },
      };
    case UPDATE_FORM_PART_THREE:
      return {
        ...state,
        FormPartThree: { ...state.FormPartThree, ...action.payload },
      };
    case SUBMIT_FORM:
      console.log("Form submitted:", state);
      return state;
    default:
      return state;
  }
};

// ====== Action Creators ======
export const updateFormPartOne = (payload) => ({
  type: UPDATE_FORM_PART_ONE,
  payload,
});

export const updateFormPartTwo = (payload) => ({
  type: UPDATE_FORM_PART_TWO,
  payload,
});

export const updateFormPartThree = (payload) => ({
  type: UPDATE_FORM_PART_THREE,
  payload,
});

export const submitForm = (payload) => ({
  type: SUBMIT_FORM,
  payload,
});

export default formReducer;
