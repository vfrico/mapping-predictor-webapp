import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES } from './constants';
import { loadedTemplates, loadedTemplatesError, deleteLoadedTemplatesError } from './actions';
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

function* defaultAct(action) {
  
}

function* apiCaller(action) {
  // console.log("Api caller for load templates");
  var api = new ApiCalls(API_ROUTE());
  try {
    const response = yield call(api.getTemplatesByLanguage, action.language);
    
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

// Function that listens to actions
function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(DEFAULT_ACTION, defaultAct);
}

function* sagaApiCall() {
  yield takeEvery(LOAD_TEMPLATES, apiCaller);
}

export default function* rootSaga() {
  yield all([
    defaultSaga(),
    sagaApiCall()
  ]);
}
