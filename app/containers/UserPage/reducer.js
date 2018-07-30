/*
 *
 * UserPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGOUT_ACTION, LOGOUT_SUCCESS } from './constants';

export const initialState = fromJS({});

function userPageReducer(state = initialState, action) {
  
  console.log("ReducerUserPage: "+JSON.stringify(state));
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGOUT_ACTION:
      // Action used to launch API request
      return state;
    case LOGOUT_SUCCESS:
      var newState = state.remove('user');
      return newState;
    default:
      return state;
  }
}

export default userPageReducer;
