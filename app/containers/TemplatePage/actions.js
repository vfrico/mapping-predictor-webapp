/*
 *
 * TemplatePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEMPLATE, TEMPLATE_LOADED, TEMPLATE_LOAD_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadTemplate(templateName, lang) {
  return {
    type: LOAD_TEMPLATE,
    templateName, 
    lang,
  }
}

export function templateLoaded(template) {
  return {
    type: TEMPLATE_LOADED,
    template,
  }
}

export function templateLoadError(template, error) {
  return {
    type: TEMPLATE_LOAD_ERROR,
    template,
    error,
  }
}
