const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
    date_visited: { type: Date, required: true }
})

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal