const express = require('express')
const router = express.Router()
const userCtrl = require('../dbos/userController')
// get user
router.get('/getMpa/:userID', userCtrl.getMpa)
// signup
router.post('/signup', userCtrl.signup)
// login
router.post('/login', userCtrl.login)
module.exports = router