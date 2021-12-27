require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
// require index
const indexRouter = require('./routes/index')
// require routes
const mpaRouter = require('./routes/mpa')
const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const commendRouter = require('./routes/commend')
// require connectDB 
const connectDB = require('./config/database')
connectDB()
// controller -> front
app.use('/controller', express.static(__dirname + '/controller'))
// view -> html
app.set('views', __dirname+'/view');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
// indexRouter - html group
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(morgan('dev'))
// connected routes
// route mpa
app.use('/', indexRouter)
// route mpa
app.use('/mpa', mpaRouter)
// route user
app.use('/user', userRouter)
// route board
app.use('/board', boardRouter)
// route commend
app.use('/commend', commendRouter)
const PORT = process.env.PORT || 7000
app.listen(PORT, console.log("connected server..."))