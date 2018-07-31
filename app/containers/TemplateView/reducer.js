/*
 *
 * TemplateView reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES, LOADED_TEMPLATES_ERROR, DELETE_LOADED_TEMPLATES_ERROR } from './constants';

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

    case LOADED_TEMPLATES_ERROR:
      console.log("Templates loaded with error: "+JSON.stringify(action));
      var newState = state.set("error", action.error);
      return newState;

    case DELETE_LOADED_TEMPLATES_ERROR:
      var newState = state.remove("error");
      return newState;
    default:
      return state;
  }
}

export default templateViewReducer;
