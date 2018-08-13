/*
 *
 * TemplateView actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES, LOADED_TEMPLATES_ERROR, DELETE_LOADED_TEMPLATES_ERROR, LOAD_LANG_PAIRS, LANG_PAIRS_LOADED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
    payload: "nada"
  }
}

export function loadTemplates(langA, langB) {
  return {
    type: LOAD_TEMPLATES,
    langA,
    langB,
  }
}

export function loadedTemplates(templates) {
  return {
    type: LOADED_TEMPLATES,
    templates,
  }
}

export function loadedTemplatesError(error) {
  return {
    type: LOADED_TEMPLATES_ERROR,
    error,
  }
}

export function deleteLoadedTemplatesError() {
  return {
    type: DELETE_LOADED_TEMPLATES_ERROR,
  }
}

export function loadLangPairs() {
  return {
    type: LOAD_LANG_PAIRS,
  }
}

export function langPairsLoaded(langPairs) {
  return {
    type: LANG_PAIRS_LOADED,
    langPairs,
  }
}