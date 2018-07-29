import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { GET_USER_INFO_FROM_BROWSER, USER_INFO_FROM_BROWSER_SUCC, SAVE_USER_INFO_ON_BROWSER } from './constants';
import { successfulBrowserUserInfo } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import { successfulLogin } from '../LoginForm/actions';

// import { take, call, put, select } from 'redux-saga/effects';

function* apiCaller(action) {
  console.log("Get info from browser");
  const bwst = new BrowserStorage();
  var obj = yield call(()=>bwst.getUser());  // To really call 
  console.log("User from local storage: "+JSON.stringify(obj));
  if (!bwst.objectIsEmpty(obj)) {
    // Only update if user object is empty
    yield put(successfulBrowserUserInfo(obj.username,obj.email, obj.jwt));
    yield put(successfulLogin(obj.username,obj.email,obj.jwt));
  }
}


function* sendLoginUserSaga() {
  yield takeEvery(GET_USER_INFO_FROM_BROWSER, apiCaller);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    sendLoginUserSaga(),
  ])
}
