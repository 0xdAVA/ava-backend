var express = require('express')
var bodyParser = require('body-parser')
var db = require('./database/mongo')
var app = express()
var logger = require('morgan')
var PORT = process.env.PORT || 6974

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(logger('dev'))

app.listen(PORT, ()=>{
    console.log('Server Running At '+PORT+' Port!')
})

require('./routes/index')(app, db)
require('./routes/auth')(app, db)