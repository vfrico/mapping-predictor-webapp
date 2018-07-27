import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOGOUT_ACTION } from './constants';
import { loadedTemplates, logoutAction, logoutSuccess } from './actions';

function* apiCaller(action) {
  console.log("I am an api call to logout");
  // yield call();  // To really call to api // TODO
  yield delay(1000);
  yield put(logoutSuccess());
}


function* sagaApiCall() {
  yield takeEvery(LOGOUT_ACTION, apiCaller);
}

export default function* rootSaga() {
  yield all([
    sagaApiCall()
  ]);
}
