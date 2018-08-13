/* 
 * Copyright 2018 Víctor Fernández <vfrico@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

export const _API_ROUTE = 'http://localhost:8080/predictor/webapi';

class BrowserStorage {
    constructor() {
        this.storage = localStorage;

        // ES6 needs manual binding :(
        this.saveUser = this.saveUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getApiBaseURL = this.getApiBaseURL.bind(this);
        this.saveUserPrefs = this.saveUserPrefs.bind(this);
        this.getUserPrefs = this.getUserPrefs.bind(this);
    }

    objectIsEmpty = obj => {
        try {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        } catch (err) {
            console.log("Error: "+err);
        }
        return false;
    }

    saveUser(username, email, jwt, role) {
        this.storage.setItem('user', JSON.stringify({
            username,
            email,
            jwt,
            role,
        }));
    }

    removeUser() {
        this.storage.removeItem('user');
    }

    saveUserPrefs(menu, prefs) {
        this.storage.setItem('prefs.'+menu, JSON.stringify(prefs));
    }

    getUserPrefs(menu, defaultResponse) {
        var prefs = undefined;
        try {
            prefs = JSON.parse(this.storage.getItem('prefs.'+menu));
        } catch (err) {
            console.error("catched on get prefs "+err);
        }
        
        if (prefs == undefined || this.objectIsEmpty(prefs)) {
            return defaultResponse;
        } else {
            return prefs;
        }
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
                role: user.role,
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
