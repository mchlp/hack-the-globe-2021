const fs = require('fs');
const constants = require('./constants');

class UserHandler {
    constructor() {
        this.userDb = JSON.parse(fs.readFileSync(constants.USER_DB_FILE_NAME));
        setInterval(() => {
            this.saveToFile();
        }, 5000);
    }

    getUser(username) {
        return {
            ...this.userDb[username],
            username,
        };
    }

    addUser(username) {
        if (!this.userDb[username]) {
            this.userDb[username] = {
                firstName: null,
                lastName: null,
                password: null,
                company: null,
                interests: [],
                history: [],
                affiliations: [],
                type: null,
            };
            this.addEventToUserHistory(username, constants.HISTORY_EVENT_TYPES.REGISTER);
            return {
                success: true,
                data: this.getUser(username),
            };
        } else {
            return {
                success: false,
                error: `user with username ${username} already exists.`,
            };
        }
    }

    updateUser(username, updatedUserData) {
        if (this.userDb[username]) {
            this.userDb[username] = {
                ...this.userDb[username],
                ...updatedUserData,
            };
            return {
                success: true,
                data: this.getUser(username),
            };
        } else {
            return {
                success: false,
                error: `user with username ${username} does not exist`,
            };
        }
    }

    saveToFile() {
        console.log('Saving user data file');
        fs.writeFileSync(constants.USER_DB_FILE_NAME, JSON.stringify(this.userDb, null, 4));
    }

    addEventToUserHistory(username, type, data) {
        if (this.userDb[username]) {
            this.userDb[username].history.push({
                type,
                ...data,
                timestamp: new Date().toString(),
            });
            return true;
        }
        return false;
    }

    donateToCharity(username, charityId, amount) {
        return this.addEventToUserHistory(username, constants.HISTORY_EVENT_TYPES.DONATE_TO_CHARITY, {
            charityId,
            amount,
        });
    }
}

module.exports = UserHandler;
