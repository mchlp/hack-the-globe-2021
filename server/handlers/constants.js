const constants = {};

constants.USER_DB_FILE_NAME = './handlers/userDb.json';

constants.CHARITY_DB_FILE_NAME = './handlers/charityDb.json';

constants.HISTORY_EVENT_TYPES = {
    REGISTER: 'register',
    DONATE_TO_CHARITY: 'donate_to_charity',
};

constants.CHARITY_CATEGORIES = {
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

constants.AVALIABLE_CATEGORIES = [
    constants.CHARITY_CATEGORIES.HOUSING_AND_HOMELESSNESS,
    constants.CHARITY_CATEGORIES.INTERNATIONAL_AID,
    constants.CHARITY_CATEGORIES.EDUCATION,
    constants.CHARITY_CATEGORIES.SOCIAL_SERVICES,
]

constants.cur_mappings = {
    'Housing and homelessness': constants.CHARITY_CATEGORIES.HOUSING_AND_HOMELESSNESS,
    Youth: constants.CHARITY_CATEGORIES.YOUTH,
    Environment: constants.CHARITY_CATEGORIES.ENVIRONMENT,
    Other: constants.CHARITY_CATEGORIES.OTHER,
    'International Aid': constants.CHARITY_CATEGORIES.INTERNATIONAL_AID,
    'Social Services': constants.CHARITY_CATEGORIES.SOCIAL_SERVICES,
    'Fundraising Organization': constants.CHARITY_CATEGORIES.FUNDRAISING,
    Education: constants.CHARITY_CATEGORIES.EDUCATION,
    Health: constants.CHARITY_CATEGORIES.HEALTH,
};

module.exports = constants;