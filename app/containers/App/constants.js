/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

 export const GET_USER_INFO_FROM_BROWSER = 'app/GET_USER_INFO_FROM_BROWSER';
 export const SAVE_USER_INFO_ON_BROWSER = 'app/SAVE_USER_INFO_ON_BROWSER';
 export const USER_INFO_FROM_BROWSER_SUCC = 'app/USER_INFO_FROM_BROWSER_SUCC';