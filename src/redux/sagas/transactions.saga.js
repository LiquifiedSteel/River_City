import axios from 'axios';
import { takeLatest, put, take } from 'redux-saga/effects';

function* transactionRootSaga() {
    yield takeLatest('REVIEW_TRANSACTION_ENV', reviewTransactionEnv);
    yield takeLatest('REVIEW_TRANSACTION', reviewTransaction)
    yield takeLatest('GRAB_TRANSACTIONS_ENV', grabTransactionsEnv);
    yield takeLatest('GRAB_TRANSACTIONS', grabTransactions);
    yield takeLatest('REVIEW_ALL', reviewAll);
}
  
function* reviewTransactionEnv(action) {
    try {
        yield axios.put(`/api/transactions/reviewed/${action.payload.id}`);
        yield put({type: 'GRAB_TRANSACTIONS_ENV', payload:{envelope: action.payload.envelope}});
    } catch (error) {
        console.error("Error reviewing transaction:", error);
    }
}

function* reviewTransaction(action) {
    try {
        yield axios.put(`/api/transactions/reviewed/${action.payload.id}`);
        yield put({type: 'GRAB_TRANSACTIONS'});
    } catch (error) {
        console.error("Error reviewing transaction:", error);
    }
}

function* grabTransactionsEnv(action) {
    try {
        const response = yield axios.get(`/api/transactions/${action.payload.envelope}`);
        yield put({ type: 'FETCH_TRANSACTIONS', payload: response.data});
        yield put({type: 'CALCULATE_REMAINING'});
    } catch (error) {
        console.error('Transactions Env GET request failed', error);
    }
}

function* grabTransactions() {
    try {
        const response = yield axios.get(`/api/transactions/`);
        yield put({ type: 'FETCH_TRANSACTIONS', payload: response.data});
        yield put({type: 'CALCULATE_REMAINING'});
    } catch (error) {
        console.error('Transactions GET request failed', error);
    }
}

function* reviewAll() {
    try {
        yield axios.put(`/api/transactions/reviewedAll`);
        yield put({ type: 'GRAB_TRANSACTIONS'});
    } catch (error) {
        console.error('Error reviewing all Transactions', error);
    }
}

export default transactionRootSaga;
