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
        this.sendLockAnnotation = this.sendLockAnnotation.bind(this);
        this.deleteLockAnnotation = this.deleteLockAnnotation.bind(this);
        this.getAnnotationById = this.getAnnotationById.bind(this);
        this.getAnnotationHelper = this.getAnnotationHelper.bind(this);
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
        return fetch(this.baseUri + '/templates/' + language + '/' + templateName, {
            method: 'GET',
            headers: {
                ... this.defaultHeaders,
            }
        })
    }

    sendUserVote(annotationId, voteType, username, jwt) {
        return fetch(this.baseUri + '/annotations/' + annotationId + '/vote', {
            method: 'POST',
            headers: {
                ... this.defaultHeaders,
                Authorization: jwt,
            },
            body: JSON.stringify({
                "vote": voteType,
                "annotationId": annotationId,
                "user": {
                    "username": username
                }
            }),
        });
    }

    sendLockAnnotation(annotationId, dateStart, dateEnd, username, jwt) {
        return fetch(this.baseUri + '/annotations/' + annotationId + '/lock', {
            method: 'POST',
            headers: {
                ... this.defaultHeaders,
                Authorization: jwt,
            },
            body: JSON.stringify({
                locked: true,
                dateStart,
                dateEnd,
                user: {
                    username,
                }
            })
        })
    }

    deleteLockAnnotation(annotationId, jwt) {
        return fetch(this.baseUri + '/annotations/' + annotationId + '/lock', {
            method: 'DELETE',
            headers: {
                ... this.defaultHeaders,
                Authorization: jwt,
            },
        })
    }

    getAnnotationById(annotationId) {
        return fetch(this.baseUri + '/annotations/' + annotationId, {
            method: 'GET',
            headers: {
                ... this.defaultHeaders,
            }
        })
    }

    getAnnotationHelper(annotationId) {
        return fetch(this.baseUri + '/annotations/' + annotationId + '/helpers', {
            method: 'GET',
            headers: {
                ... this.defaultHeaders,
            }
        })
    }
}

export default ApiCalls;
