/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_USER_INFO_FROM_BROWSER, USER_INFO_FROM_BROWSER_SUCC, SAVE_USER_INFO_ON_BROWSER } from './constants';

import { LOGOUT_SUCCESS } from '../UserPage/constants';

export const initialState = fromJS({});

function appReducer(state = initialState, action) {
  
  switch (action.type) {
    case GET_USER_INFO_FROM_BROWSER:
      return state;
    case USER_INFO_FROM_BROWSER_SUCC:
      
      var newState = state.set("user", {
        username: action.username,
        email: action.email,
        jwt: action.jwt,
        role: action.role,
      });
      return newState;
    
    case LOGOUT_SUCCESS:
      var newState = state.remove('user');
      return newState;
    
      default:
      return state;
  }
}

export default appReducer;
