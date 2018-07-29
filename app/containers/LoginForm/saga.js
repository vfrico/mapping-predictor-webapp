import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { SEND_LOGIN } from "./constants";
import { successfulLogin } from "./actions";
import BrowserStorage from '../../api/browserStorage';

// import { take, call, put, select } from 'redux-saga/effects';

function* apiCaller(action) {
  console.log("Api caller for send login");
  // yield call();  // To really call 
  yield delay(1000);

  // Update state on browser
  var brwst = new BrowserStorage();
  brwst.saveUser("username", "password", "email@example.com");

  // Update state of successful login
  yield put(successfulLogin("username","password","email@example.com"));
}


function* sendLoginUserSaga() {
  yield takeEvery(SEND_LOGIN, apiCaller);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    sendLoginUserSaga(),
  ])
}
