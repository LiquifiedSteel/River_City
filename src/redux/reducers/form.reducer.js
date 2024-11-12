// ====== Initial State ======
const initialState = {
  FormPartOne: {
    team_org_event: "",
    title_w_team_org_event: "",
    coach_Contact_first_name: "",
    coach_Contact_last_name: "",
    coach_contact_email: "",
    coach_contact_phone: "",
    website: "",
  },
  FormPartTwo: {
    event_type: "",
    PreferredTime_start: "",   // Will be a timestamp
    PreferredTime_end: "",     // Will be a timestamp
    Preferred_Location_primary: 0,
    Preferred_Location_secondary: 0,
    preferred_space: 0,
    eventDescription: "", //
    expected_attendance: "",
    ageGroup: "", //
    preferred_days: "",
    priority: "",              // might change to an integer based on what functionality we choose to do  
    specificAreas: "", //
    alternativeChoices: "", //
    start_date: "",            // Will be a date
    end_date: "",              // Will be a date
    additional_dates: "",
    frequency: "", //
  },
  FormPartThree: {
    WF_students: false,
    grade_level: "",
    team_pdf: "",
    liabilityProof: "", //
    districtAcknowledgment: false,
    specialRequests: "", // 
    rented_previously: false,
    read_Rental_Review: false,
    renter_first_name: "",
    renter_last_name: "",
    renter_street_address: "",
    renter_city: "",
    renter_state: "",
    renter_zip: "",
    renter_phone: "",
    renter_email: "",
    agreeToRespectfulUseOfSpace: false,
    agreeToInvoicePaymentProcess: false,
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

export const submitForm = () => ({
  type: SUBMIT_FORM,
});

export default formReducer;
