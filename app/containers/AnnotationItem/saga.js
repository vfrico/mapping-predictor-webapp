import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { SEND_VOTE } from "./constants";
import { voteAccepted, voteRejected } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';



var objectIsEmpty = obj => {
  try {
      return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (err) {
      console.log("Error: "+err);
  }
  return false;
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
      console.log("Error found on API:")
      const err = yield call([response, response.json])
      console.log("The error is: "+JSON.stringify(err))
      yield put(voteRejected(action.annotationId, err));
    }
  } catch (e) {
    console.log("error is ="+e);
    console.error(e)
    console.log("Message: "+e.message)
    yield put(voteRejected(action.annotationId, {msg: e.message}));
  }
}

function* sendVoteSaga() {
  yield takeEvery(SEND_VOTE, apiCallSendVote);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    sendVoteSaga(),
  ])
}
