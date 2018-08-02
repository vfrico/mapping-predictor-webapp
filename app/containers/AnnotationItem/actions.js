/*
 *
 * AnnotationItem actions
 *
 */

import { DEFAULT_ACTION, SEND_VOTE, VOTE_ACCEPTED, VOTE_REJECTED, DELETE_VOTE_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendVote(voteType, annotationId, username, jwt) {
  console.log("SENd vote")
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