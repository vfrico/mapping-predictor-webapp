import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOAD_LANG_PAIRS, LOADED_TEMPLATES_ERROR } from './constants';
import { loadedTemplates, loadedTemplatesError, deleteLoadedTemplatesError, langPairsLoaded } from './actions';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';
import BrowserStorage from '../../api/browserStorage';

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

function* defaultAct(action) {
  
}

function* apiCaller(action) {
  // console.log("Api caller for load templates");
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.getTemplatesByLanguage, action.langA, action.langB);
    
    if (response.status === 200) {
      const templatesList = yield call([response, response.json]);
      if (templatesList != undefined && !objectIsEmpty(response)) {
        
        yield put(deleteLoadedTemplatesError());
        // Update state of successful login
        yield put(loadedTemplates(templatesList));
      }
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err))
      yield put(loadedTemplatesError(err));
    }
    
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(loadedTemplatesError({msg: e.message}));
  }
  // console.log("I am an api call");
  // // yield call();  // To really call to api
  // yield delay(1000);
  // yield put(loadedTemplates({"templates":["template1", "template2"]}));
}


function* apiCallerLangPairs(action) {
  console.log("Api caller to collect lang pairs: "+JSON.stringify(action));
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.getLangPairs);

    if (response.status === 200) {
      const langPairsList = yield call([response, response.json]);
      if (langPairsList != undefined && !objectIsEmpty(langPairsList)) {
        yield put(langPairsLoaded(langPairsList));

        // Update state on browser
        var brwst = new BrowserStorage();
        brwst.saveUserPrefs("langPairs", {
          langPairs: langPairsList,
        })
      } else {
        yield put(loadedTemplatesError({msg: "Empty response"}));
      }
    } else {
      const err = yield call([response, response.json])
      console.error("The error is: "+JSON.stringify(err));
      yield put(loadedTemplatesError(err));
    }
  } catch (e) {
    console.error("Message: "+e.message)
    yield put(loadedTemplatesError({msg: e.message}));
  }
}

function* delayErrorDeletion(action) {
  yield delay(5 * 1000);
  yield put(deleteLoadedTemplatesError());
}

// Function that listens to actions
function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(DEFAULT_ACTION, defaultAct);
}

function* sagaApiCall() {
  yield takeEvery(LOAD_TEMPLATES, apiCaller);
}

function* sagaApiCallLoadLangPairs() {
  yield takeEvery(LOAD_LANG_PAIRS, apiCallerLangPairs);
}

function* sagaDeleteErrorLoadTemplate() {
  yield takeEvery(LOADED_TEMPLATES_ERROR, delayErrorDeletion);
}

export default function* rootSaga() {
  yield all([
    defaultSaga(),
    sagaApiCall(),
    sagaApiCallLoadLangPairs(),
    sagaDeleteErrorLoadTemplate(),
  ]);
}
