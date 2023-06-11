const express = require('express')
const router= express.Router()
const {getAll, getOne, addFeedback} = require('../controllers/feedbackController');

router.get('/', getAll);
router.get('/:orderID', getOne)
router.post('/addFeedback', addFeedback)

module.exports = router;