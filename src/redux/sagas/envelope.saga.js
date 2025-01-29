import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* envelopeRootSaga() {
    yield takeLatest('ADD_ENVELOPE', addEnvelope);
}
  
function* addEnvelope(action) {
    try {
        yield axios.post('/api/envelopes/add', action.payload);

        yield put({ type: 'SWITCH'});
    } catch (error) {
        console.log('Envelope POST request failed', error);
    }
}

export default envelopeRootSaga;
