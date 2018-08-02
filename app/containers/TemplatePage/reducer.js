/*
 *
 * TemplatePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TEMPLATE_LOADED, LOAD_TEMPLATE, TEMPLATE_LOAD_ERROR } from './constants';

export const initialState = fromJS({});

function templatePageReducer(state = initialState, action) {
  
  switch (action.type) {
    case DEFAULT_ACTION:
    case LOAD_TEMPLATE:
      return state;

    case TEMPLATE_LOADED:
      var newState = state.set("template", action.template);
      return newState;

    case TEMPLATE_LOAD_ERROR:
      var newState = state.set("error", action.error);
      return newState;

    default:
      return state;
  }
}

export default templatePageReducer;
