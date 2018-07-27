import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userPage state domain
 */

const selectUserPageDomain = state => state.get('userPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserPage
 */

const makeSelectUserPage = () =>
  createSelector(selectUserPageDomain, substate => substate.toJS());

export default makeSelectUserPage;
export { selectUserPageDomain };
