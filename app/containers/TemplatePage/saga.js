import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { LOAD_TEMPLATE } from "./constants";
import { templateLoaded, templateLoadError } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';
import { SEND_VOTE } from '../AnnotationItem/constants';
import { voteAccepted, voteRejected } from '../AnnotationItem/actions';



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

function* sendVoteSaga() {
  console.log("saga 1 on parent")
  yield takeLatest(SEND_VOTE, apiCallSendVote);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    getTemplateSaga(),
    sendVoteSaga(),
  ])
}
