const router = require('express').Router()
const {NOT_FOUND} = require('../utils/errors')
const {
  getCards,
  createCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards')

router.get('/cards/', getCards)
router.post('/cards/', createCard)
router.delete('/cards/:cardId', deleteCard)
router.put('/cards/:cardId/likes', toggleLike)
router.delete('/cards/:cardId/likes', (req, res) => toggleLike(req, res, false))
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Service not found' })
})
module.exports = router