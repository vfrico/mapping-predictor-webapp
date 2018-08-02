export const _API_ROUTE = 'http://localhost:8080/predictor/webapi';

class BrowserStorage {
    constructor() {
        this.storage = localStorage;

        // ES6 needs manual binding :(
        this.saveUser = this.saveUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getApiBaseURL = this.getApiBaseURL.bind(this);
    }

    objectIsEmpty = obj => {
        try {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        } catch (err) {
            console.log("Error: "+err);
        }
        return false;
    }

    saveUser(username, email, jwt) {
        this.storage.setItem('user', JSON.stringify({
            username,
            email,
            jwt,
        }));
    }

    removeUser() {
        this.storage.removeItem('user');
    }

    getUser() {
        var user = undefined;
        try {
            user = JSON.parse(this.storage.getItem('user'));
        } catch (err) {
            console.error("catched: "+err)
        }
        
        if (user == undefined || this.objectIsEmpty(user)) {
            return {};
        } else {
            return {
                username: user.username,
                email: user.email,
                jwt: user.jwt,
            }
        }
    }

    getApiBaseURL() {
        var baseUri;
        try{
            baseUri = this.storage.getItem('baseURI');            
        } catch (err) {
            return _API_ROUTE;
        }
        if (baseUri == undefined || this.objectIsEmpty(baseUri)) {
            return _API_ROUTE;
        } else {
            return baseUri;
        }
    }
}

export default BrowserStorage;
