import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { LOAD_TEMPLATE } from "./constants";
import { templateLoaded, templateLoadError, loadTemplate } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';
import { SEND_VOTE, DELETE_VOTE_ERROR, VOTE_REJECTED, SEND_LOCK, GET_LOCK_ERROR, DELETE_LOCK, GET_ANNOTATION_HELPER } from '../AnnotationItem/constants';
import { voteAccepted, voteRejected, deleteError, deleteVoteError, lockSuccess, lockError, lockDeleteError, helpersReceived } from '../AnnotationItem/actions';

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

var objectIsEmpty = obj => {
  try {
      return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (err) {
      console.error("Error: "+err);
  }
  return false;
}

function* getTemplateFromApi(action) {
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.getTemplateInfo, action.templateName, action.lang);
    
    if (response.status === 200) {
      const templateInfo = yield call([response, response.json]);
      if (templateInfo != undefined && !objectIsEmpty(templateInfo)) {
       
        // Update state of successful login
        // yield put(deleteErrorLogin())
        yield put(templateLoaded(templateInfo));
      }
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(templateLoadError(action.templateName, err));
    }
    
  } catch (e) {
    console.error("error is on saga for template page ="+e);
    yield put(templateLoadError(action.templateName, {msg: e.message}));
  }
}


function* getTemplateSaga() {
  yield takeEvery(LOAD_TEMPLATE, getTemplateFromApi);
}


function* apiCallSendVote(action) {
  console.log("Api caller for send vote. Action = "+JSON.stringify(action));
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.sendUserVote, action.annotationId, action.voteType, action.username, action.jwt);
    
    if (response.status === 201) {
      const annotation = yield call([response, response.json]);
      if (annotation != undefined && !objectIsEmpty(annotation)) {
        // Update state of successful login
        yield put(voteAccepted(action.annotationId, annotation));
      }
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(voteRejected(action.annotationId, err));
    }
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(voteRejected(action.annotationId, {msg: e.message}));
  }
}

function* apiCallSendLock(action) {
  console.log("Api caller to send lock on annotation. Action="+JSON.stringify(action));
  var api = new ApiCalls(API_ROUTE());

  try {
    var dateStart = Date.now();
    var dateEnd = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const response = yield(call(api.sendLockAnnotation, action.annotationId, dateStart, dateEnd, action.user.username, action.user.jwt));
    console.log("response was: "+JSON.stringify(response)+" with code: "+response.status);
    if (response.status === 201) {
      console.log("call again")
      const annotation_r = yield call(api.getAnnotationById, action.annotationId);
      console.log("call to get json from: "+JSON.stringify(annotation_r));
      const annotation = yield call([annotation_r, annotation_r.json]);
      console.log("annotation is: "+annotation);
      yield put(lockSuccess(action.annotationId, annotation));
      yield put(loadTemplate(annotation.templateB, annotation.langB));

    } else {
      const err = yield call([response, response.json])
      yield put(lockError(action.annotationId, {msg: response.status+": "+JSON.stringify(err)}));
    }
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(lockError(action.annotationId, {msg: e.message}));
  }
}

function* apiCallSendUnlock(action) {
  console.log("Api caller to send unlock on annotation. Action="+JSON.stringify(action));
  var api = new ApiCalls(API_ROUTE());

  try {
    const response = yield(call(api.deleteLockAnnotation, action.annotationId, action.user.jwt));
    console.log("response was: "+JSON.stringify(response)+" with code: "+response.status);
    if (response.status === 204) { // deleted successfully
      console.log("call again")
      const annotation_r = yield call(api.getAnnotationById, action.annotationId);
      console.log("call to get json from: "+JSON.stringify(annotation_r));
      const annotation = yield call([annotation_r, annotation_r.json]);
      console.log("annotation is: "+annotation);
      yield put(lockSuccess(action.annotationId, annotation));
      yield put(loadTemplate(annotation.templateB, annotation.langB));

    } else {
      const err = yield call([response, response.json])
      yield put(lockError(action.annotationId, {msg: response.status+": "+JSON.stringify(err)}));
    }
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(lockError(action.annotationId, {msg: e.message}));
  }
}


function* apiCallGetHelper(action) {
  console.log("Api caller to get helpers. Action: "+JSON.stringify(action));
  var api = new ApiCalls(API_ROUTE());

  try {
    const response = yield(call(api.getAnnotationHelper, action.annotationId));
    if (response.status == 200) {
      const helpers = yield(call([response, response.json]));
      
      if (helpers != undefined && !objectIsEmpty(helpers)) {
        yield put(helpersReceived(action.annotationId, helpers));
      } else {
        yield put(lockError(action.annotationId, {msg: "the response is empty"}));
      }
    } else {
      const err = yield call([response, response.json])
      yield put(lockError(action.annotationId, {msg: response.status+": "+JSON.stringify(err)}));
    }
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(lockError(action.annotationId, {msg: e.message}));
  }
}

function* delayDeleteError(action) {
  yield delay(5 * 1000);
  yield put(deleteVoteError(action.annotationId));
}

function* delayDeleteLockError(action) {
  yield delay(5 * 1000);
  yield put(lockDeleteError(action.annotationId));
}

function* sendVoteSaga() {
  console.log("saga 1 on parent")
  yield takeLatest(SEND_VOTE, apiCallSendVote);
}

function* deleteErrorSaga() {
  yield takeEvery(VOTE_REJECTED, delayDeleteError);
}


function* deleteErrorLockSaga() {
  yield takeEvery(GET_LOCK_ERROR, delayDeleteLockError);
}

function* sagaSendLock() {
  yield takeEvery(SEND_LOCK, apiCallSendLock);
}

function* sagaDeleteLock() {
  yield takeEvery(DELETE_LOCK, apiCallSendUnlock);
}

function* sagaGetAnnotationHelper() {
  yield takeEvery(GET_ANNOTATION_HELPER, apiCallGetHelper);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    getTemplateSaga(),
    sendVoteSaga(),
    deleteErrorSaga(),
    sagaSendLock(),
    deleteErrorLockSaga(),
    sagaDeleteLock(),
    sagaGetAnnotationHelper(),
  ])
}
