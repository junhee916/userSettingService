const express = require('express')
const router = express.Router()
// 로그인 관리 (관리자)
router
.get('/mpaSignup', (req, res) => {
    res.render('./mpaSignup.html')
})
.get('/mpaLogin', (req, res) => {
    res.render('./mpaLogin.html')
})
// 로그인 관리 (사용자)
router
.get('/userSignup', (req, res) => {
    res.render('./userSignup.html')
})
.get('/userLogin', (req, res) => {
    res.render('./userLogin.html')
})
// 사용자 게시판 관리
router
.get('/board', (req, res) => {
    res.render('./board.html')
})
.get('/boardShow', (req, res) => {
    res.render('./boardShow.html')
})
.get('/commendShow', (req, res) => {
    res.render('./commendShow.html')
})
// 사용자 검증 관리
router
.get('/viewAuthority', (req, res) => {
    res.render('./viewAuthority.html')
})
.get('/setUserShow', (req, res) => {
    res.render('./setUserShow.html')
})
module.exports = router