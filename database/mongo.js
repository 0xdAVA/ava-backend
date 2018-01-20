var DB_NAME = '0XD_Hackathon_AVA'
var mongoose = require('mongoose')
var db = mongoose.connect("mongodb://localhost/"+DB_NAME, (err)=>{

    if(err){
        console.log('DB Error')
        throw err
    }
    else {
        console.log('DB Connect Success => '+DB_NAME)
    }

})

var User_Schema = mongoose.Schema({
    username : {type : String},
    id : {type : String},
    password : {type : String}
})

var User = mongoose.model('user', User_Schema)

exports.db = db
exports.User = User
