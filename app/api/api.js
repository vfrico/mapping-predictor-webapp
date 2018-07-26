class ApiCalls {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    userLogin(username, password) {
        return fetch(this.baseUri + '/users/' + username + '/login' , {
            method: 'POST',
            body: JSON.stringify({
                password_md5: password,
                username
            })
        });
    }
}

export default ApiCalls;
