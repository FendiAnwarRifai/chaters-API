const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatControllers')
const { verifyAccess } = require('../middlewares/auth')
const { uploadMulter } = require('../middlewares/upload')

router.get('/', verifyAccess, chatController.getAll)
router.get('/personal/:id', verifyAccess, chatController.userById)
router.patch('/edit-personal/:id', verifyAccess, uploadMulter.single('images'), chatController.updateUser)
router.get('/history', verifyAccess, chatController.history_chat)


module.exports = router