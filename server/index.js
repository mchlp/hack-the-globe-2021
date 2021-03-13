const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const CharityHandler = require('./handlers/charityHandler');
const UserHandler = require('./handlers/userHandler');

app.use(cors());
app.use(express.json());

const charityHandler = new CharityHandler();
const userHandler = new UserHandler();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test-endpoint', (req, res) => {
    res.send({
        data: 'hello hello!!',
    });
});

app.post('/user/new', (req, res) => {
    if (req.body && req.body.username && req.body.company) {
        res.send(userHandler.addUser(req.body.username, req.body.company));
    } else {
        res.status(400).send('Body must contain username and company field.');
    }
});

app.post('/user/update', (req, res) => {
    if (req.body && req.body.username && req.body.updatedUserData) {
        res.send(userHandler.updateUser(req.body.username, req.body.updatedUserData));
    } else {
        res.status(400).send('Body must contain username and updatedUserData.');
    }
});

app.post('/user/donate', (req, res) => {
    if ((req.body && req.body.username && req.body.charityId, req.body.amount)) {
        const userFound = userHandler.donateToCharity(req.body.username, req.body.charityId, req.body.amount);
        const charityFound = charityHandler.addDonationAmount(req.body.charityId, req.body.amount);
        const result = {
            success: userFound && charityFound,
        };
        if (!result.success) {
            result.error = `userFound: ${userFound}, charityFound: ${charityFound}`;
        }
        res.send(result);
    } else {
        res.status(400).send('Body must contain username and updatedUserData.');
    }
});

app.get('/user/get/:username', (req, res) => {
    res.send(userHandler.getUser(req.params.username));
});

app.get('/interests/list', (req, res) => {
    res.send(charityHandler.getInterests());
});

app.get('/charity/recommendation/:username', (req, res) => {
    const userData = userHandler.getUser(req.params.username)    
    res.send(charityHandler.getRecommendation(userData));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
