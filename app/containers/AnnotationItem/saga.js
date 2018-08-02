import { delay } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { SEND_VOTE } from "./constants";
import { voteAccepted, voteRejected } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';



var objectIsEmpty = obj => {
  try {
      return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (err) {
      console.error("Error: "+err);
  }
  return false;
}

/*
function* sendVoteSaga() {
  console.log("saga 1")
  yield takeLatest(SEND_VOTE, apiCallSendVote);
}*/

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    //sendVoteSaga(),
  ])
}
