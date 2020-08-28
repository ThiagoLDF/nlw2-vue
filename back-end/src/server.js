const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const { pageStudy, saveClasses } = require('./pages')

const port = 3000

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.post('/search', jsonParser, (req, res) => {
  pageStudy(req.body).then(result => res.send(result))
})

app.post('/save', jsonParser, (req, res, next) => {
  saveClasses(req.body).then(result => res.send(result))
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})