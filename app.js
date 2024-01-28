const express = require('express')
const app = express()
const morgan = require('morgan')
const journalRoutes = require('./routes/journalRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(morgan('combined'))
app.use('/journals', journalRoutes)
app.use('/users', userRoutes)



module.exports = app