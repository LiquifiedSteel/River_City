// ====== Initial State ======
const initialState = {
  FormPartOne: {
    fullName: "",
    organizationName: "",
    title: "",
    email: "",
    phoneNumber: "",
    mailingAddress: "",
  },
  FormPartTwo: {
    eventName: "",
    eventDescription: "",
    expectedAttendees: "",
    ageGroup: "",
    preferredBuildingOne: "",
    preferredBuildingTwo: "",
    preferredSpace: "",
    preferredDay: "",
    specificAreas: "",
    alternativeChoices: "",
    startDateTime: "",
    endDateTime: "",
    frequency: "",
  },
  FormPartThree: {
    percentOfStudents: false,
    gradeLevel: "",
    roster: "",
    liabilityProof: "",
    districtAcknowledgment: false,
    specialRequests: "",
    previousUse: "",
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
