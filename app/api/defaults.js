import BrowserStorage from "./browserStorage";



const brwst = new BrowserStorage();

export function API_ROUTE() {
    return brwst.getApiBaseURL();
}

export const VOTE_CORRECT = 'CORRECT_MAPPING';
export const VOTE_WRONG = 'WRONG_MAPPING';