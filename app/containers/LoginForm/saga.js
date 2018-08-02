import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { SEND_LOGIN, ERROR_LOGIN, SEND_SIGN_UP, SIGN_UP_ERROR } from "./constants";
import { successfulLogin, errorLogin, deleteErrorLogin, sendLogin, signUpSuccess, signUpError } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';

// import { take, call, put, select } from 'redux-saga/effects';

// var sendLogin = (username, password) => {
  
//   console.log("sendLoginApi: user="+username+" y pass="+password);
//   api.userLogin(username, password).then((response) => {
//     return response.json();
//   });
// }

var objectIsEmpty = obj => {
  try {
      return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (err) {
      console.error("Error: "+err);
  }
  return false;
}

function* apiCaller(action) {
  // console.log("Api caller for send login");
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.userLogin, action.username, action.password);
    
    if (response.status === 200) {
      const user = yield call([response, response.json]);
      if (user != undefined && !objectIsEmpty(user)) {
        // Update state on browser
        var brwst = new BrowserStorage();
        brwst.saveUser(user.username, user.email, user.jwt);
  
        // Update state of successful login
        yield put(deleteErrorLogin())
        yield put(successfulLogin(user.username, user.email, user.jwt));
      }
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(errorLogin(action.user, err));
    }
    
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(errorLogin(action.username, {msg: e.message}));
  }
}

function* apiSignUpCaller(action) {
  // console.log("Api caller for sign up");
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.userSignUp, action.username, action.password, action.email);
    
    if (response.status === 201) {
      const user = yield call([response, response.json]);

      yield put(deleteErrorLogin())

      //yield put(signUpSuccess(user.username, user.password))
      yield put(sendLogin(user.username, user.password_md5));
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(signUpError(action.username, err));
    }
    
  } catch (e) {
    console.log("Error message: "+e.message)
    yield put(signUpError(action.username, {msg: e.message}));
  }

}

function* delayDeletion(action) {
  yield delay(10 * 1000);
  yield put(deleteErrorLogin());
}

function* sendLoginUserSaga() {
  yield takeEvery(SEND_LOGIN, apiCaller);
}

function* errorLoginSaga() {
  yield takeEvery(ERROR_LOGIN, delayDeletion);
  yield takeEvery(SIGN_UP_ERROR, delayDeletion);
}

function* sendSignUpSaga() {
  yield takeEvery(SEND_SIGN_UP, apiSignUpCaller);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    sendLoginUserSaga(),
    errorLoginSaga(),
    sendSignUpSaga(),
  ])
}
