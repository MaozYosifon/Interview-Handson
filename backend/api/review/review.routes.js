const express = require('express')
const { getReviews,addReview } = require('./task.controller')
const router = express.Router()

router.get('/', getReviews)
router.post('/', addReview)

module.exports = router