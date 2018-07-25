import { fromJS } from 'immutable';
import templateViewReducer from '../reducer';

describe('templateViewReducer', () => {
  it('returns the initial state', () => {
    expect(templateViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
