const fs = require('fs');

const USER_DB_FILE_NAME = './handlers/userDb.json';

const sampleUser = {
    username: 'name',
    name: 'Test Name',
    company: 'Test Company',
    interests: [],
    history: [],
    affiliations: [],
};

class UserHandler {
    constructor() {
        this.userDb = JSON.parse(fs.readFileSync(USER_DB_FILE_NAME));
        console.log(this.userDb);
        setInterval(() => {
            this.saveToFile();
        }, 5000);
    }

    addUser(username, company) {
        if (!this.userDb[username]) {
            this.userDb[username] = {
                username,
                name: null,
                company,
                interests: [],
                history: [],
                affiliations: [],
            };
            return {
                success: true,
                data: this.userDb[username],
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
                data: this.userDb[username],
            };
        } else {
            return {
                success: false,
                error: `user with username ${username} does not exist`,
            };
        }
    }

    saveToFile() {
        console.log("Saving user data file")
        fs.writeFileSync(USER_DB_FILE_NAME, JSON.stringify(this.userDb, null, 4));
    }
}

module.exports = UserHandler;
