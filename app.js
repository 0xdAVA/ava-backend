var express = require('express')
var bodyParser = require('body-parser')
var db = require('./database/mongo')
var request = require("request")
var moment = require('moment')
var RandomString = require('randomstring')
var passport = require('passport')
var AppFacebookStrategy = require('passport-facebook-token')
var multer = require('multer')
var app = express()
var logger = require('morgan')
var PORT = process.env.PORT || 6974

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use('/profile_img', express.static('profile_img'))
app.use('/Ah', express.static('Ah'))
app.use('/Na', express.static('Na'))
app.use('/Ba', express.static('Ba'))
app.use('/Da', express.static('Da'))

app.use(logger('dev'))

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, ()=>{
    console.log('Server Running At '+PORT+' Port!')
})

require('./routes/index')(app, db)
require('./routes/auth')(app, db, RandomString, multer)
require('./routes/AppFacebook')(app, db, RandomString, passport, AppFacebookStrategy)
require('./routes/Ah')(app, db, RandomString, multer, request, moment)
require('./routes/Na')(app, db, RandomString, multer, request, moment)
require('./routes/BA')(app, db, RandomString, multer, request, moment)
require('./routes/Da')(app, db, RandomString, multer, request, moment)