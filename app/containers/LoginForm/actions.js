/*
 *
 * LoginForm actions
 *
 */

import { DEFAULT_ACTION, SEND_LOGIN, SUCCESSFUL_LOGIN } from './constants';

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

export function successfulLogin(username, password, email) {
  return {
    type: SUCCESSFUL_LOGIN,
    username,
    password,
    email,
  }
}
