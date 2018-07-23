import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the SignupForm state domain
 */

const selectSignupFormDomain = state => state.get('SignupForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignupForm
 */

const makeSelectSignupForm = () =>
  createSelector(selectSignupFormDomain, substate => substate.toJS());

export default makeSelectSignupForm;
export { selectSignupFormDomain };
