import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOGOUT_ACTION, LOGOUT_ERROR } from './constants';
import { loadedTemplates, logoutAction, logoutSuccess, logoutError, deleteErrorUserPage } from './actions';
import BrowserStorage from '../../api/browserStorage';
import ApiCalls from '../../api/api';
import { API_ROUTE } from '../../api/defaults';

function* apiCaller(action) {

  console.log("Api caller for logout. Action="+JSON.stringify(action))
  var api = new ApiCalls(API_ROUTE());
  // yield call();  // To really call 
  try {
    const response = yield call(api.userLogout, action.username, action.jwt);
    
    if (response.status === 204) {
      // If logout was successful, delete from local storage
      var brwst = new BrowserStorage();
      brwst.removeUser();

      // send actual action
      yield put(logoutSuccess());
      yield put(deleteErrorUserPage());
      
    } else {
      console.log("Error found on API:")
      const err = yield call([response, response.json])
      console.log("The error is: "+JSON.stringify(err))
      yield put(logoutError(action.username, err));
    }
    
  } catch (e) {
    console.log("error on logout: "+e);
    console.error(e)
    var errorString = e.message;
    console.log("ErrorString: "+errorString)
    yield put(logoutError(action.username, e.message));
  }
}


function* delayErrorDeletion(action) {
  console.log("Delete error msg on userPage");
  // yield call();  // To really call to api // TODO
  yield delay(10 * 1000);
  yield put(deleteErrorUserPage());
}

function* sagaApiCall() {
  yield takeEvery(LOGOUT_ACTION, apiCaller);
}

function* sagaApiCallDelete() {
  yield takeEvery(LOGOUT_ERROR, delayErrorDeletion);
}

export default function* rootSaga() {
  yield all([
    sagaApiCall(),
    sagaApiCallDelete()
  ]);
}
