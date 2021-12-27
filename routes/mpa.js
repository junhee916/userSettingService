const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const mpaCtrl = require('../dbos/mpaController')
const mailCtrl = require('../pbos/sendMailController')
// get detail user id 
router.get('/detailUser/:userId', checkAuth, mpaCtrl.getDetailUser)
// get group COMPANY in user
router.get('/getUser', checkAuth, mpaCtrl.getUser)
// get COMPANY
router.get('/getCOMPANY', checkAuth, mpaCtrl.getCOMPANY)
// signup
router.post('/signup', mpaCtrl.signup)
// login
router.post('/login', mpaCtrl.login)
// update change "Y" user MPA 
router.post('/updateUser/:userId', checkAuth, mpaCtrl.updateUser)
// update change "N" user MPA 
router.post('/deleteUser/:userId', checkAuth, mpaCtrl.deleteUser)
// send email
router.post('/sendMail', checkAuth, mailCtrl.send)
module.exports = router