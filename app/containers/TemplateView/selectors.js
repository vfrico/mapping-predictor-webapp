import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the templateView state domain
 * 
 * Should stay as it is
 */

const selectTemplateViewDomain = state =>
  state.get('templateView', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TemplateView
 */

const makeSelectTemplateView = () =>
  createSelector(selectTemplateViewDomain, substate => substate.toJS());

export default makeSelectTemplateView;
export { selectTemplateViewDomain };
