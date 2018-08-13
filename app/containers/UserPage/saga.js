import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOGOUT_ACTION, LOGOUT_ERROR, SEND_CSV_LANGPAIR, SEND_CLASSIFY_BY_LANG, CSV_UPLOAD_SUCCESS } from './constants';
import { loadedTemplates, logoutAction, logoutSuccess, logoutError, deleteErrorUserPage, submitTriplesResponse, deleteAdminError } from './actions';
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';

/* 
 * Copyright 2018 Víctor Fernández <vfrico@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

function* apiCaller(action) {
  // console.log("Api caller for logout. Action="+JSON.stringify(action))
  var api = new ApiCalls(API_ROUTE());
  // yield call();  // To really call 
  try {
    // Remove login credentials even if API call fails
    var brwst = new BrowserStorage();
    brwst.removeUser();

    const response = yield call(api.userLogout, action.username, action.jwt);
    
    if (response.status === 204) {
      // send actual action
      yield put(logoutSuccess());
      yield put(deleteErrorUserPage());
      
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(logoutError(action.username, err));
    }
    
  } catch (e) {
    var errorString = e.message;
    console.error("ErrorString: "+errorString)
    yield put(logoutError(action.username, errorString));
  }
}

function* apiSendFileCSV(action) {
  // console.log("Api caller for logout. Action="+JSON.stringify(action))
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.postCSVAnnotations, action.langA, action.langB, action.csvFile);
    if (response.status === 200) {
      const message = yield call([response, response.json]);
      yield put(submitTriplesResponse(message));
      
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(submitTriplesResponse(err));
    }
    
  } catch (e) {
    var errorString = e.message;
    console.error("ErrorString: "+errorString)
    yield put(submitTriplesResponse({msg: errorString}));
  }
}

function* apiSendClassifyByLang(action) {
  console.log("APi classify lang")
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.postClassifyAnnotations, action.langA, action.langB);
    if (response.status === 201) {
      const message = yield call([response, response.json]);
      yield put(submitTriplesResponse(message));
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err));
      yield put(submitTriplesResponse(err))
    }
  } catch (e) {
    var errorString = e.message;
    console.error("ErrorString: "+errorString)
    yield put(submitTriplesResponse({msg: errorString}));
  }
}


function* delayErrorDeletion(action) {
  yield delay(10 * 1000);
  yield put(deleteErrorUserPage());
}

function* delayAdminErrorDeletion(action) {
  yield delay(10 * 1000);
  yield put(deleteAdminError());
}


function* sagaApiCall() {
  yield takeEvery(LOGOUT_ACTION, apiCaller);
}

function* sagaApiCallDelete() {
  yield takeEvery(LOGOUT_ERROR, delayErrorDeletion);
}

function* sagaSendFile() {
  yield takeEvery(SEND_CSV_LANGPAIR, apiSendFileCSV);
}

function* sagaCallClassify() {
  console.log("classify")
  yield takeEvery(SEND_CLASSIFY_BY_LANG, apiSendClassifyByLang);
}

function* sagaDeleteAdminError() {
  yield takeEvery(CSV_UPLOAD_SUCCESS, delayAdminErrorDeletion);
}

export default function* rootSaga() {
  yield all([
    sagaApiCall(),
    sagaApiCallDelete(),
    sagaSendFile(),
    sagaCallClassify(),
    sagaDeleteAdminError(),
  ]);
}
