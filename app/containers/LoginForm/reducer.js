/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SEND_LOGIN, SUCCESSFUL_LOGIN } from './constants';

export const initialState = fromJS({});

function loginFormReducer(state = initialState, action) {
  console.log("LoginFormReducer with action: "+JSON.stringify(action));
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SEND_LOGIN:
      // This action does not modify the application status
      // Will be watched by middleware saga to send an API call
      // and run a response action

      // TODO: dispatch an action for successful signup, 
      // to allow the user see it actually is registered on the system
      return state;
    case SUCCESSFUL_LOGIN:
      console.log("SUCCEsful login: "+JSON.stringify(action));
      var newState = state.set("user", {
        username: action.username,
        password: action.password,
        email: action.email,
      });
      return newState;

    default:
      return state;
  }
}

export default loginFormReducer;
