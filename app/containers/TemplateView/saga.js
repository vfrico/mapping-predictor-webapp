import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES } from './constants';
import { loadedTemplates } from './actions';

function* defaultAct(action) {
  console.log("Is this the default action??");
}

function* apiCaller(action) {
  console.log("I am an api call");
  // yield call();  // To really call to api
  yield delay(1000);
  yield put(loadedTemplates({"templates":["template1", "template2"]}));
}

// Function that listens to actions
function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(DEFAULT_ACTION, defaultAct);
}

function* sagaApiCall() {
  yield takeEvery(LOAD_TEMPLATES, apiCaller);
}

export default function* rootSaga() {
  yield all([
    defaultSaga(),
    sagaApiCall()
  ]);
}
