import BrowserStorage from "./browserStorage";



const brwst = new BrowserStorage();

export function API_ROUTE() {
    var uri = process.env.REACT_APP_API_URL == undefined ? brwst.getApiBaseURL() : process.env.REACT_APP_API_URL;
    console.log("URI is: "+ uri);
    return uri;
}

export const VOTE_CORRECT = 'CORRECT_MAPPING';
export const VOTE_WRONG = 'WRONG_MAPPING';