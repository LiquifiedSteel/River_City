import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function* submitFormSaga(action) {
  try {
    const { FormPartOne, FormPartTwo, FormPartThree } = action.payload;

    // ====== Handle file uploads (e.g., roster and liabilityProof) ======
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
    const rosterUrl = FormPartThree.roster
      ? yield call(uploadFile, FormPartThree.roster)
      : null;

    const liabilityProofUrl = FormPartThree.liabilityProof
      ? yield call(uploadFile, FormPartThree.liabilityProof)
      : null;

    // ====== Prepare the final payload ======
    const finalPayload = {
      ...FormPartOne,
      ...FormPartTwo,
      ...FormPartThree,
      rosterUrl,
      liabilityProofUrl,
    };

    const response = yield call(axios.post, "/api/form/submit", finalPayload);

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
