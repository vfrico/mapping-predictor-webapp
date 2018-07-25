/*
 *
 * TemplateView actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEMPLATES, LOADED_TEMPLATES } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
    payload: "nada"
  }
}

export function loadTemplates() {
  return {
    type: LOAD_TEMPLATES
  }
}

export function loadedTemplates(templates) {
  return {
    type: LOADED_TEMPLATES,
    templates
  }
}
