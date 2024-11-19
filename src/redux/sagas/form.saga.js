import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function* submitFormSaga(action) {
  try {
    console.log(action.payload);
    const formData = action.payload;
    console.log(formData.formPartTwo);
    console.log(formData.formPartTwo.team_pdf);

    // ====== Handle file uploads (e.g., roster) ======
    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
        formData
      );
      return response.data.url;
    };

    // ====== Upload files if they exist ======
    const rosterUrl = formData.formPartTwo.team_pdf
      ? yield call(uploadFile, formData.formPartTwo.team_pdf)
      : null;

    // ====== Prepare the final payload ======
    const finalPayload = {
      ...formData.formPartOne,
      ...formData.formPartTwo,
      ...formData.formPartThree,
      rosterUrl,
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
