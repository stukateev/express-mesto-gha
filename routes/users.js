const router = require('express').Router()
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users')

router.get('/users/', getUsers)
router.post('/users/', createUser)
router.get('/users/:userId', getUser)
router.patch('/users/me', updateProfile)
router.patch('/users/me/avatar', updateAvatar)

module.exports = router