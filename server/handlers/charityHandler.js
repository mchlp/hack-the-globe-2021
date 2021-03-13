const fs = require('fs');
const { AVALIABLE_CATEGORIES } = require('./constants');
const constants = require('./constants');
class CharityHandler {
    constructor() {
        this.charityDb = JSON.parse(fs.readFileSync(constants.CHARITY_DB_FILE_NAME));

        for (const charity of Object.values(this.charityDb)) {
            // if (!charity.amountDonated) {
            //     charity.amountDonated = 0
            // }
        }

        setInterval(() => {
            this.saveToFile();
        }, 5000);
    }

    saveToFile() {
        console.log('Saving charity data file');
        fs.writeFileSync(constants.CHARITY_DB_FILE_NAME, JSON.stringify(this.charityDb, null, 4));
    }

    getRecommendation(userData) {
        const pastCharityCategories = {};
        userData.history
            .filter((event) => {
                return event.type == constants.HISTORY_EVENT_TYPES.DONATE_TO_CHARITY;
            })
            .map((event) => {
                const charity = this.getCharity(event.charityId);
                if (charity.categories) {
                    for (const category of charity.categories) {
                        if (pastCharityCategories[category]) {
                            pastCharityCategories[category]++;
                        } else {
                            pastCharityCategories[category] = 1;
                        }
                    }
                }
            });

        const charityScores = [];
        for (const charityId in this.charityDb) {
            let curCharityScore = 0;
            const curCharity = this.charityDb[charityId];

            if (curCharity.categories) {
                for (const category of curCharity.categories) {
                    // if it's not in our list of recommendeds, don't return it
                    if (!constants.AVALIABLE_CATEGORIES.includes(category)) {
                        curCharityScore -= Infinity;
                    }

                    // higher score if they've donated to this category before
                    if (pastCharityCategories[category]) {
                        curCharityScore += Math.log(pastCharityCategories[category]);
                    }
                }
            }

            // add some randomness
            curCharityScore += Math.random() * 60;

            charityScores.push({ charityId, score: curCharityScore });
        }

        const sortedCharities = charityScores
            .sort((charity1, charity2) => {
                return charity1.score - charity2.score;
            })
            .reverse();
        // console.log(charityScores);
        // return sortedCharities;

        return this.getCharity(sortedCharities[0].charityId);
    }

    getInterests() {
        return constants.AVALIABLE_CATEGORIES;
    }

    getCharity(charityId) {
        return {
            ...this.charityDb[charityId],
            id: charityId,
        };
    }

    addDonationAmount(charityId, amount) {
        if (this.charityDb[charityId]) {
            this.charityDb[charityId].amountDonated += amount;
            return true;
        }
        return false;
    }
}

module.exports = CharityHandler;
