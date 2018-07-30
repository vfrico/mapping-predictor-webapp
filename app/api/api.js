class ApiCalls {

    constructor(baseUri) {
        this.baseUri = baseUri;
        this.defaultHeaders = {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        }
        // ES6 needs manual binding :(
        this.userLogin = this.userLogin.bind(this);
        this.userLogout = this.userLogout.bind(this);
        this.userSignUp = this.userSignUp.bind(this);
    }

    userLogin(username, password) {
        return fetch(this.baseUri + '/users/' + username + '/login' , {
            method: 'POST',
            body: JSON.stringify({
                password_md5: password,
                username
            }),
            headers: {
                ... this.defaultHeaders,
            }
        })
    }

    userLogout(username, token) {
        return fetch(this.baseUri + '/users/' + username + '/logout', {
            method: 'POST',
            body: JSON.stringify({
                username,
            }),
            headers: {
                ... this.defaultHeaders,
                "Authorization": token,
            }
        })
    }

    userSignUp(username, password, email) {
        return fetch(this.baseUri + '/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password_md5: password,
                email,
            }),
            headers: {
                ... this.defaultHeaders,
            }
        })
    }
}

export default ApiCalls;
