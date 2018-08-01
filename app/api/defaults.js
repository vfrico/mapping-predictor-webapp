import BrowserStorage from "./browserStorage";



const brwst = new BrowserStorage();

export function API_ROUTE() {
    return brwst.getApiBaseURL();
}