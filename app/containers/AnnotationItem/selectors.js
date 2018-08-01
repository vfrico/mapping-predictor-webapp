import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the annotationItem state domain
 */

const selectAnnotationItemDomain = state =>
  state.get('annotationItem', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnnotationItem
 */

const makeSelectAnnotationItem = () =>
  createSelector(selectAnnotationItemDomain, substate => substate.toJS());

export default makeSelectAnnotationItem;
export { selectAnnotationItemDomain };
