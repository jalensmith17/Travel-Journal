const express = require('express')
const app = express()
const journalRoutes = require('./routes/journalRoutes')

app.use(express.json())
app.use('/journals', journalRoutes)


module.exports = app