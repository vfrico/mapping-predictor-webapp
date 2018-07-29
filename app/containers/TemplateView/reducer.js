/*
 *
 * TemplateView reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES } from './constants';

export const initialState = fromJS({});

function templateViewReducer(state = initialState, action) {
  console.log("TemplateViewReducer with action: "+JSON.stringify(action));
  switch (action.type) {
    case DEFAULT_ACTION:
      var newState = state.set("new", "defaultActionOnReducer");
      return newState;

    case LOAD_TEMPLATES:
      var newState = state;
      return newState;

    case LOADED_TEMPLATES:
      console.log("Action: "+JSON.stringify(action));
      var newState = state.set("templates", action.templates);
      return newState;

    default:
      return state;
  }
}

export default templateViewReducer;
