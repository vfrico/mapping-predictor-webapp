import { fromJS } from 'immutable';
import annotationItemReducer from '../reducer';

describe('annotationItemReducer', () => {
  it('returns the initial state', () => {
    expect(annotationItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
