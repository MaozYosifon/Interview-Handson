const reviewService = require('./review.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getReviews(req, res) {
  try {
    logger.debug('Getting Reviews')
    // var queryParams = JSON.parse(req.query.params)

    const reviews = await reviewService.query()
    // const reviews = await reviewService.query(queryParams)
    res.json(reviews)
  } catch (err) {
    logger.error('Failed to get reviews', err)
    res.status(500).send({ err: 'Failed to get reviews' })
  }
}



// POST (add review)
async function addReview(req, res) {
  try {
    const review = req.body
    const addedReview = await reviewService.add(review)
    res.json(addedReview)
  } catch (err) {
    logger.error('Failed to add review', err)
    res.status(500).send({ err: 'Failed to add review' })
  }
}


module.exports = {
  getReviews,
  addReview,
}
