import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { GET_USER_INFO_FROM_BROWSER, USER_INFO_FROM_BROWSER_SUCC, SAVE_USER_INFO_ON_BROWSER } from './constants';
import { successfulBrowserUserInfo } from "./actions";
import BrowserStorage from '../../api/browserStorage';
import { successfulLogin } from '../LoginForm/actions';

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
  // console.log("Get info from browser");
  const bwst = new BrowserStorage();
  var obj = yield call(()=>bwst.getUser());  // To really call 
  if (!bwst.objectIsEmpty(obj)) {
    // Only update if user object is empty
    yield put(successfulBrowserUserInfo(obj.username,obj.email, obj.jwt, obj.role));
    yield put(successfulLogin(obj.username, obj.email, obj.jwt, obj.role));
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
