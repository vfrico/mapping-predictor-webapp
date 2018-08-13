/*
 *
 * TemplateView reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES, LOADED_TEMPLATES_ERROR, DELETE_LOADED_TEMPLATES_ERROR, LANG_PAIRS_LOADED, LOAD_LANG_PAIRS } from './constants';

export const initialState = fromJS({});

function templateViewReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      var newState = state.set("new", "defaultActionOnReducer");
      return newState;

    case LOAD_LANG_PAIRS:
    case LOAD_TEMPLATES:
      var newState = state;
      return newState;

    case LOADED_TEMPLATES:
      var newState = state.set("templates", action.templates);
      return newState;

    case LOADED_TEMPLATES_ERROR:
      var newState = state.set("error", action.error);
      return newState;

    case LANG_PAIRS_LOADED:
      var newState = state.set("langPairs", action.langPairs);
      return newState;

    case DELETE_LOADED_TEMPLATES_ERROR:
      var newState = state.remove("error");
      return newState;
    default:
      return state;
  }
}

export default templateViewReducer;
