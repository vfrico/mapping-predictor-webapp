/*
 *
 * LoginForm actions
 *
 */

import { DEFAULT_ACTION, SEND_LOGIN, SUCCESSFUL_LOGIN, ERROR_LOGIN, DELETE_ERROR_LOGIN, SEND_SIGN_UP, SIGN_UP_ERROR, SIGN_UP_SUCCESS } from './constants';

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

export function successfulLogin(username, email, jwt, role) {
  return {
    type: SUCCESSFUL_LOGIN,
    username,
    email,
    jwt,
    role,
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

export function sendSignUp(username, password, email, role) {
  return {
    type: SEND_SIGN_UP,
    username,
    password,
    email,
    role,
  }
}

export function signUpSuccess(username, password) {
  return {
    type: SIGN_UP_SUCCESS,
    username,
    password,
  }
}

export function signUpError(username, error) {
  return {
    type: SIGN_UP_ERROR,
    username,
    error,
  }
}