const express = require('express')
const router = express.Router()
const friendsController = require('../controllers/friendsControllers')
const { verifyAccess } = require('../middlewares/auth')

router.get('/my-friends', verifyAccess, friendsController.myFriends)
router.post('/add-friends', verifyAccess, friendsController.add)
router.patch('/update', verifyAccess, friendsController.update)

module.exports = router