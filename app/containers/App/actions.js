/*
 *
 * App actions
 *
 */

import { GET_USER_INFO_FROM_BROWSER, USER_INFO_FROM_BROWSER_SUCC, SAVE_USER_INFO_ON_BROWSER } from './constants';

export function getUserInfo() {
  return {
    type: GET_USER_INFO_FROM_BROWSER,
  }
}

export function successfulBrowserUserInfo(username, email, jwt) {
  return {
    type: USER_INFO_FROM_BROWSER_SUCC,
    username,
    jwt,
    email,
  }
}

export function saveBrowserUserInfo(username, email, jwt) {
    return {
      type: SAVE_USER_INFO_ON_BROWSER,
      username,
      jwt,
      email,
    }
  }
  