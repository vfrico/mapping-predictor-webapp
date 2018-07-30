import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userPage state domain
 */

const selectUserPageDomain = state => {
  console.log("all state 3: "+JSON.stringify(state));
  return state.get('userPage', initialState);
}
/**
 * Other specific selectors
 */

const selectUserInformation = state => {
  console.log("all state 4: "+JSON.stringify(state));
  return state.get('loginForm', initialState);
}

/**
 * Default selector used by UserPage
 */

const makeSelectUserPage = () =>
  createSelector(selectUserPageDomain, substate => substate.toJS());

const makeSelectUserInformation = () =>
  createSelector(selectUserInformation, substate => substate.toJS());

export default makeSelectUserPage;
export { selectUserPageDomain , makeSelectUserInformation};
