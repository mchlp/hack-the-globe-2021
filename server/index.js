const cors = require('cors')
const express = require('express')
const app = express()
const port = 3001

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test-endpoint', (req, res) => {
    res.send({
        data: "hello hello!!"
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})