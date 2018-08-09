/*
 *
 * AnnotationItem actions
 *
 */

import { DEFAULT_ACTION, SEND_VOTE, VOTE_ACCEPTED, VOTE_REJECTED, DELETE_VOTE_ERROR, 
         SEND_LOCK, GET_LOCK_SUCCESS, GET_LOCK_ERROR, GET_LOCK_DELETE_ERROR, DELETE_LOCK } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendVote(voteType, annotationId, username, jwt) {
  return {
    type: SEND_VOTE,
    voteType,
    annotationId, 
    username,
    jwt,
  };
}

export function voteAccepted(annotationId, payload) {
  return {
    type: VOTE_ACCEPTED,
    annotationId, 
    payload,
  };
}

export function voteRejected(annotationId, payload) {
  return {
    type: VOTE_REJECTED, 
    annotationId,
    payload,
  }
}

export function deleteVoteError(annotationId) {
  return {
    type: DELETE_VOTE_ERROR,
    annotationId,
  }
}

export function sendLock(annotationId, user) {
  return {
    type: SEND_LOCK,
    annotationId,
    user,
  }
}

export function lockSuccess(annotationId, payload) {
  return {
    type: GET_LOCK_SUCCESS,
    annotationId,
    payload,
  }
}

export function lockError(annotationId, payload) {
  return {
    type: GET_LOCK_ERROR,
    annotationId,
    payload,
  }
}

export function lockDeleteError(annotationId) {
  return {
    type: GET_LOCK_DELETE_ERROR,
    annotationId,
  }
}

export function deleteLock(annotationId, user) {
  return {
    type: DELETE_LOCK,
    annotationId, 
    user,
  }
}