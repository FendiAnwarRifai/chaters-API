const express = require('express')
const router = express.Router()
const auth = require('./auth')
const chat = require('./chat')
const friends = require('./friends')
router.use('/auth', auth)
router.use('/chat', chat)
router.use('/friends', friends)
module.exports = router