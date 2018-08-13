import { delay } from 'redux-saga'
import { call, put, take, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { SEND_VOTE } from "./constants";
import { voteAccepted, voteRejected } from "./actions";
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
