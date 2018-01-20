var express = require('express')
var bodyParser = require('body-parser')
var db = require('./database/mongo')
var RandomString = require('randomstring')
var passport = require('passport')
var AppFacebookStrategy = require('passport-facebook-token')
var WebFacebookStrategy = require('passport-facebook')
var multer = require('multer')
// var io = require('socket.io').listen(5000)
var app = express()
var logger = require('morgan')
var PORT = process.env.PORT || 6974

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(logger('dev'))

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, ()=>{
    console.log('Server Running At '+PORT+' Port!')
})

require('./routes/index')(app, db)
require('./routes/auth')(app, db, RandomString)
require('./routes/AppFacebook')(app, db, RandomString, passport, AppFacebookStrategy)