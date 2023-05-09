const router = require('express').Router()
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

module.exports = router