import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
// import { take, call, put, select } from 'redux-saga/effects';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOGOUT_ACTION } from './constants';
import { loadedTemplates, logoutAction, logoutSuccess } from './actions';
import BrowserStorage from '../../api/browserStorage';

function* apiCaller(action) {
  console.log("I am an api call to logout");
  // yield call();  // To really call to api // TODO
  yield delay(1000);

  // If logout was successful, delete from local storage
  var brwst = new BrowserStorage();
  brwst.removeUser();

  // send actual action
  yield put(logoutSuccess());
}


function* sagaApiCall() {
  yield takeEvery(LOGOUT_ACTION, apiCaller);
}

export default function* rootSaga() {
  yield all([
    sagaApiCall()
  ]);
}
