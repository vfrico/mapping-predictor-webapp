class BrowserStorage {
    constructor() {
        console.log("browserStorage class")
        this.storage = localStorage;
        console.log("storage is: "+JSON.stringify(this.storage));
        console.log(this)
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
        console.log('before');
        console.log(this);
        var user = undefined;
        try {
            var user = JSON.parse(this.storage.getItem('user'));
        } catch (err) {
            console.log("catched: "+err)
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
}

export default BrowserStorage;
