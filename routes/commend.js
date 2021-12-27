const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const commendCtrl = require('../dbos/commendController')
// get commend
router.get('/get/:boardId', checkAuth, commendCtrl.get)
// get user in commend 
router.get('/detail/:commendId', checkAuth, commendCtrl.detailGet)
// save
router.post('/save', checkAuth, commendCtrl.save)
router.post('/delete/:commendId', checkAuth, commendCtrl.delete)
module.exports = router