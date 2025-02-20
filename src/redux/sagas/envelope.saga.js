import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* envelopeRootSaga() {
    yield takeLatest('ADD_ENVELOPE', addEnvelope);
    yield takeLatest('GRAB_ENVELOPES', grabEnvelopes);
}
  
function* addEnvelope(action) {
    try {
        yield axios.post('/api/envelopes/add', action.payload);

        yield put({type: 'GRAB_ENVELOPES'});
        yield put({type: 'SWITCH'});
    } catch (error) {
        console.error('Envelope POST request failed', error);
    }
}

function* grabEnvelopes(action) {
    try {
        const response = yield axios.get('/api/envelopes/', action.payload);

        yield put({type: 'FETCH_ENVELOPES', payload: response.data})
        yield put({type: 'CALCULATE_REMAINING'});
    } catch (error) {
        console.error('Envelope POST request failed', error);
    }
}

export default envelopeRootSaga;
