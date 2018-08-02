import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { LOAD_TEMPLATE } from "./constants";
import { templateLoaded, templateLoadError } from "./actions";
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

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    getTemplateSaga(),
  ])
}
