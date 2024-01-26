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

//Update

//Create

//Show