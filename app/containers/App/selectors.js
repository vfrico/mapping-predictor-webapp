import { createSelector } from 'reselect';

const selectRoute = state => {
  console.log("all state 2: "+JSON.stringify(state));
  return state.get('route');
}

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export { makeSelectLocation };
