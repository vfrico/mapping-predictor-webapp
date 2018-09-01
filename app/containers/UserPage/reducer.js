/*
 *
 * UserPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGOUT_ACTION, LOGOUT_SUCCESS, SEND_CSV_LANGPAIR, CSV_UPLOAD_SUCCESS, SEND_CLASSIFY_BY_LANG, DELETE_ADMIN_ERROR, START_INDETERMINATE_PROGRESS, END_INDETERMINATE_PROGRESS } from './constants';

export const initialState = fromJS({});

function userPageReducer(state = initialState, action) {
  console.log("reducer with action", action)
    switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SEND_CLASSIFY_BY_LANG:
    case SEND_CSV_LANGPAIR:
    case LOGOUT_ACTION:
      // Action used to launch API request
      return state;

    case DELETE_ADMIN_ERROR:
      var newState = state.remove("response");
      return newState;

    case CSV_UPLOAD_SUCCESS:
      var newState = state.set("response", action.payload);
      return newState;

    case LOGOUT_SUCCESS:
      var newState = state.remove('user');
      return newState;

    case START_INDETERMINATE_PROGRESS:
      var newState = state.set('indeterminate_progress', true);
      return newState;

    case END_INDETERMINATE_PROGRESS:
      var newState = state.remove('indeterminate_progress');
      return newState;
      
    default:
      return state;
  }
}

export default userPageReducer;
