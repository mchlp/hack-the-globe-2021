const fs = require('fs');

const CHARITY_DB_FILE_NAME = './handlers/charityDb.json';

const CHARITY_CATEGORIES = {
    HOUSING_AND_HOMELESSNESS: 'housing_and_homelessness',
    YOUTH: 'youth',
    ENVIRONMENT: 'environment',
    OTHER: 'other',
    INTERNATIONAL_AID: 'international_aid',
    SOCIAL_SERVICES: 'social_services',
    FUNDRAISING: 'fundraising_organization',
    EDUCATION: 'education',
    HEALTH: 'health',
};

const cur_mappings = {
    'Housing and homelessness': CHARITY_CATEGORIES.HOUSING_AND_HOMELESSNESS,
    Youth: CHARITY_CATEGORIES.YOUTH,
    Environment: CHARITY_CATEGORIES.ENVIRONMENT,
    Other: CHARITY_CATEGORIES.OTHER,
    'International Aid': CHARITY_CATEGORIES.INTERNATIONAL_AID,
    'Social Services': CHARITY_CATEGORIES.SOCIAL_SERVICES,
    'Fundraising Organization': CHARITY_CATEGORIES.FUNDRAISING,
    Education: CHARITY_CATEGORIES.EDUCATION,
    Health: CHARITY_CATEGORIES.HEALTH,
};

class CharityHandler {
    constructor() {
        this.charityDb = JSON.parse(fs.readFileSync(CHARITY_DB_FILE_NAME));
        setInterval(() => {
            this.saveToFile();
        }, 5000);
        // for (const charity of this.charityDb) {
        //     if (cur_mappings[charity.category]) {
        //         charity.category = cur_mappings[charity.category]
        //     } else {
        //         console.log("NOT FOUND " + charity.category)
        //     }
        // }
    }

    saveToFile() {
        console.log('Saving charity data file');
        fs.writeFileSync(CHARITY_DB_FILE_NAME, JSON.stringify(this.charityDb, null, 4));
    }

    getRecommendation() {
        return this.charityDb[Math.floor(Math.random() * this.charityDb.length)];
    }
}

module.exports = CharityHandler;
