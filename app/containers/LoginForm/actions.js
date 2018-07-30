/*
 *
 * LoginForm actions
 *
 */

import { DEFAULT_ACTION, SEND_LOGIN, SUCCESSFUL_LOGIN, ERROR_LOGIN, DELETE_ERROR_LOGIN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendLogin(username, password) {
  return {
    type: SEND_LOGIN,
    username,
    password,
  }
}

export function successfulLogin(username, email, jwt) {
  return {
    type: SUCCESSFUL_LOGIN,
    username,
    email,
    jwt,
  }
}

export function errorLogin(username, error) {
  return {
    type: ERROR_LOGIN,
    username,
    error,
  }
}

export function deleteErrorLogin() {
  return {
    type: DELETE_ERROR_LOGIN,
  }
}