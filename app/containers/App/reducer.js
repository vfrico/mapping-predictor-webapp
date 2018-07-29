/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_USER_INFO_FROM_BROWSER, USER_INFO_FROM_BROWSER_SUCC, SAVE_USER_INFO_ON_BROWSER } from './constants';

export const initialState = fromJS({});

function appReducer(state = initialState, action) {
  console.log("App reducer: action="+JSON.stringify(action));
  switch (action.type) {
    case GET_USER_INFO_FROM_BROWSER:
      return state;
    case USER_INFO_FROM_BROWSER_SUCC:
      console.log("SUCCEsful user info retrieved: "+JSON.stringify(action));
      var newState = state.set("user", {
        username: action.username,
        email: action.email,
        jwt: action.jwt,
      });
      return newState;
    default:
      return state;
  }
}

export default appReducer;
