import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* userListRootSaga() {
    yield takeLatest('ADD_USER', addUser);
    yield takeLatest('GRAB_USER_LIST', grabUsers);
}
  
function* addUser(action) {
    try {
        yield axios.post('/api/user/register', action.payload);
        yield put({type: 'GRAB_USER_LIST'});
    } catch (error) {
        console.error('User list POST request failed', error);
    }
}

function* grabUsers() {
    try {
        const response = yield axios.get('/api/user/users');
        yield put({type: 'FETCH_USER_LIST', payload: response.data});
    } catch (error) {
        console.error('User List GET request failed', error);
    }
}

export default userListRootSaga;