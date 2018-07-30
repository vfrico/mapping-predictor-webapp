import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOGOUT_ACTION } from './constants';
import { loadedTemplates, logoutAction, logoutSuccess, logoutError } from './actions';
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';

function* apiCaller(action) {

  console.log("Api caller for logout. Action="+JSON.stringify(action))
  var api = new ApiCalls('http://localhost:8080/predictor/webapi');
  // yield call();  // To really call 
  try {
    const response = yield call(api.userLogout, action.username, action.jwt);
    
    if (response.status === 204) {
      // If logout was successful, delete from local storage
      var brwst = new BrowserStorage();
      brwst.removeUser();

      // send actual action
      yield put(logoutSuccess());
      
    } else {
      console.log("Error found on API:")
      const err = yield call([response, response.json])
      console.log("The error is: "+JSON.stringify(err))
      yield put(logoutError(action.username, err));
    }
    
  } catch (e) {
    console.log("err="+e);
    console.error(e)
    yield put(logoutError(action.user, e));
  }
}


function* sagaApiCall() {
  yield takeEvery(LOGOUT_ACTION, apiCaller);
}

export default function* rootSaga() {
  yield all([
    sagaApiCall()
  ]);
}
