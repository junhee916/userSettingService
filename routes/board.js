const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const boardCtrl = require('../dbos/boardController')
// all get
router.get('/allGet', checkAuth, boardCtrl.allGet)
// detail get board
router.get('/detail/:boardId', checkAuth, boardCtrl.detailGet)
// save board
router.post('/save', checkAuth, boardCtrl.save)
// update board
router.post('/update/:boardId', checkAuth, boardCtrl.update)
// delete detail board
router.post('/delete/:boardId', checkAuth, boardCtrl.delete)
module.exports  = router