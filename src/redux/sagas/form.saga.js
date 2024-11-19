import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function* submitFormSaga(action) {
  try {
    console.log(action.payload);
    const formData = action.payload;
    console.log(formData.formPartTwo);
    console.log(formData.formPartTwo.team_pdf);

    // ====== Prepare the final payload ======
    const finalPayload = {
      ...formData.formPartOne,
      ...formData.formPartTwo,
      ...formData.formPartThree,
    };
    console.log(finalPayload);
    const response = yield call(axios.post, "/api/application", finalPayload);

    yield put({ type: "FORM_SUBMISSION_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Form submission failed:", error);
    yield put({ type: "FORM_SUBMISSION_FAILED", error });
  }
}

function* formSaga() {
  yield takeLatest("SUBMIT_FORM", submitFormSaga);
}

export default formSaga;
