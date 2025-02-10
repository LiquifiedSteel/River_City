import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* remainingRootSaga() {
    yield takeLatest('CALCULATE_REMAINING', calculateRemaining);
}
  
function* calculateRemaining() {
    try {
        let remain = 0;
        // Fetch budget items data
        const response1 = yield axios.get(`/api/envelopes/navBudget`);
        remain = Number(response1.data[0].amount);
        const response2 = yield axios.get(`/api/transactions/reviewed`);
        let remove = 0;
        for (let item of response2.data) {
            remove += Number(item.amount);
        } 
        yield put({type: 'FETCH_REMAINING', payload: remove});
    } catch (error) {
        console.error("Error fetching calculating remaining budget", error);
    }
}

export default remainingRootSaga;