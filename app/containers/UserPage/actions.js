/*
 *
 * UserPage actions
 *
 */

import { DEFAULT_ACTION, LOGOUT_ACTION, LOGOUT_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}