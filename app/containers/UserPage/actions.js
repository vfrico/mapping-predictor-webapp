/*
 *
 * UserPage actions
 *
 */

import { DEFAULT_ACTION, LOGOUT_ACTION, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_ERROR_DELETE, SEND_CSV_LANGPAIR, CSV_UPLOAD_SUCCESS, SEND_CLASSIFY_BY_LANG, DELETE_ADMIN_ERROR } from './constants';

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

export function sumbitTriplesCSV(langA, langB, csvFile) {
  return {
    type: SEND_CSV_LANGPAIR,
    langA,
    langB,
    csvFile,
  }
}

export function submitTriplesResponse(payload) {
  return {
    type: CSV_UPLOAD_SUCCESS,
    payload,
  }
}

export function sendClassifyByLang(langA, langB) {
  return {
    type: SEND_CLASSIFY_BY_LANG,
    langA,
    langB,
  }
}

export function deleteAdminError() {
  return {
    type: DELETE_ADMIN_ERROR,
  }
}