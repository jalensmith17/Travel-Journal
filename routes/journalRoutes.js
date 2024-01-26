const express = require('express')
const router = express.Router()
const journalController = require('../controllers/journalController')

//index
router.get('/', journalController.indexJournal)
//delete
router.delete('/:id', journalController.deleteJournal)
//update
router.put('/:id', journalController.updateJournal)
//create
router.post('/', journalController.createJournal)
//show
router.get('/:id', journalController.getJournal)

module.exports = router