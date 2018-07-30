/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SEND_LOGIN, SUCCESSFUL_LOGIN, ERROR_LOGIN, DELETE_ERROR_LOGIN, SIGN_UP_ERROR, SIGN_UP_SUCCESS, SEND_SIGN_UP } from './constants';
import { LOGOUT_ACTION, LOGOUT_SUCCESS } from '../UserPage/constants';

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
        jwt: action.jwt,
        email: action.email,
      });
      return newState;

    case LOGOUT_ACTION:
      // Action used to launch API request
      return state;

    case LOGOUT_SUCCESS:
      var newState = state.remove('user');
      return newState;

    case ERROR_LOGIN:
      var newState = state.set("error", {
        username: action.username,
        error: action.error
      })
      return newState;

    case DELETE_ERROR_LOGIN:
      var newState = state.remove("error");
      return newState;

    case SIGN_UP_ERROR:
      var newState = state.set("error", {
        username: action.username,
        error: action.error,
      })
      return newState;

    case SIGN_UP_SUCCESS:
      // TODO: The saga will send the login action
      return state;

    case SEND_SIGN_UP:
      // TODO: The saga will fire api call
      return state;

    default:
      return state;
  }
}

export default loginFormReducer;
