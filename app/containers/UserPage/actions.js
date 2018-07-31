/*
 *
 * UserPage actions
 *
 */

import { DEFAULT_ACTION, LOGOUT_ACTION, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_ERROR_DELETE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutAction(username, jwt) {
  return {
    type: LOGOUT_ACTION,
    username,
    jwt,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutError(username, error) {
  return {
    type: LOGOUT_ERROR,
    username,
    error,
  };
}

export function deleteErrorUserPage() {
  return {
    type: LOGOUT_ERROR_DELETE,
  }
}