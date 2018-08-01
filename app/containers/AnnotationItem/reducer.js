/*
 *
 * AnnotationItem reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SEND_VOTE, VOTE_ACCEPTED, VOTE_REJECTED } from './constants';

export const initialState = fromJS({});

function annotationItemReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SEND_VOTE:
      // The saga will launch API request
      return state;

    case VOTE_ACCEPTED:
      // Update the state of the annotation
      var newState = state.put("annotation", action.payload);
      return newState

    case VOTE_REJECTED:
      var newState = state.put("error", action.payload);
      return newState;
      
    default:
      return state;
  }
}

export default annotationItemReducer;
