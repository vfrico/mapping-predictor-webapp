/*
 *
 * TemplateView actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES, LOADED_TEMPLATES_ERROR, DELETE_LOADED_TEMPLATES_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
    payload: "nada"
  }
}

export function loadTemplates(language) {
  return {
    type: LOAD_TEMPLATES,
    language,
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
