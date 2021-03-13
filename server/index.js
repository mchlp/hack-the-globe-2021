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
        res.status(400).send("Body must contain username and company field.")
    }
});

app.get('/charity/recommendation', (req, res) => {
    res.send(charityHandler.getRecommendation());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
