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
        this.getTemplatesByLanguage = this.getTemplatesByLanguage.bind(this);
        this.getTemplateInfo = this.getTemplateInfo.bind(this);
        this.sendUserVote = this.sendUserVote.bind(this);
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

    getTemplatesByLanguage(language) {
        return fetch(this.baseUri + '/templates?lang=' + language , {
            method: 'GET',
            headers: {
                ... this.defaultHeaders,
            }
        })

    }

    getTemplateInfo(templateName, language) {
        return fetch(this.baseUri + '/templates/' + templateName + '?lang=' + language , {
            method: 'GET',
            headers: {
                ... this.defaultHeaders,
            }
        })
    }

    sendUserVote(annotationId, voteType, username, jwt) {
        return fetch();
    }
}

export default ApiCalls;
