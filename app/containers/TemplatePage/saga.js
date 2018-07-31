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
      console.log("Error: "+err);
  }
  return false;
}

function* getTemplateFromApi(action) {
  console.log("Api caller for get template page");
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
      console.log("Error found on API template page")
      const err = yield call([response, response.json])
      console.log("The error is: "+JSON.stringify(err))
      yield put(templateLoadError(action.templateName, err));
    }
    
  } catch (e) {
    console.log("error is on saga for template page ="+e);
    console.error(e)
    console.log("Message: "+e.message)
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
