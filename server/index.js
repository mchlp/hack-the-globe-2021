const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const CharityHandler = require('./handlers/charityHandler')

app.use(cors());

const charityHandler = new CharityHandler()

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test-endpoint', (req, res) => {
    res.send({
        data: 'hello hello!!',
    });
});

app.get('/charity/recommendation', (req, res) => {
  res.send(charityHandler.getRecommendation());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
