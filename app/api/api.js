class ApiCalls {

    constructor(baseUri) {
        this.baseUri = baseUri;

        // ES6 needs manual binding :(
        this.userLogin = this.userLogin.bind(this);
    }

    userLogin(username, password) {
        return fetch(this.baseUri + '/users/' + username + '/login' , {
            method: 'POST',
            body: JSON.stringify({
                password_md5: password,
                username
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
    }
}

export default ApiCalls;
