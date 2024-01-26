const Journal = require('../models/journal')

//Index
exports.indexJournal = async (req, res) => {
    try {
        const foundJournals = await Journal.find({})
        res.status(200).json({ journals: foundJournals})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Delete
exports.deleteJournal = async (req, res) => {
    try {
        await Journal.findOneAndDelete({ '_id': req.params.id })
        res.status(200).json({ message: 'Journal has been abolished' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Update
exports.updateJournal = async (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }

    try {
        const updatedJournal = await Journal.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true })
        res.status(200).json(updatedJournal)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Create
exports.createJournal = async (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }

    try {
        const todo = await Journal.create(req.body)
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Show
exports.getJournal = async (req, res) => {
    try {
        const foundJournal = await Journal.findOne({ _id: req.params.id })
        res.status(200).json(foundJournal)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}