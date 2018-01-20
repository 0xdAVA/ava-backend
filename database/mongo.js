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
    password : {type : String},
    user_token : {type : String},
    facebook_token : {type : String},
    profile_img : {type : String}
})

var Ah_Schema = mongoose.Schema({
    post_token : {type : String},
    auther : {type : String},
    auther_token : {type : String},
    title : {type : String},
    text : {type : String},
    date : {type : String},
    photo : {type : String},
    like : {type : Number}
})

var Na_Schema = mongoose.Schema({
    type : {type : Number},
    state : {type : Number},
    title : {type : String},
    text : {type : String},
    date : {type : String},
    quality_status : {type : Number},
    tag : {type : Number},
    author : {type : String},
    author_token : {type : String},
    post_token : {type : String},
    send_type : {type : Number},
    photo : {type : String}
})

var NaDeal_Schema = mongoose.Schema({
    deal_token : {type : String},
    master_token : {type : String},
    slave_token : {type : String},
    post_token : {type : String},
    master_name : {type : String},
    slave_name : {type : String},
    state : {type : Number},
    delivery_number : {type : String},
    item : {type : String},
    comment : {type : Array}
})

var Ba_Schema = mongoose.Schema({
    type : {type : Number},
    state : {type : Number},
    title : {type : String},
    text : {type : String},
    date : {type : String},
    quality_status : {type : Number},
    tag : {type : Number},
    author : {type : String},
    author_token : {type : String},
    post_token : {type : String},
    send_type : {type : Number},
    photo : {type : String},
    comment :{type : Array}
})

var BaDeal_Schema = mongoose.Schema({
    deal_token : {type : String},
    master_token : {type : String},
    slave_token : {type : String},
    master_name : {type : String},
    slave_name : {type : String},
    ba_master : {type : Object},
    ba_slave : {type : Object},
    state : {type : Number},
    master_delivery_number : {type : String},
    slave_delivery_number : {type : String},
    comment : Array
})

var Da_Schema = mongoose.Schema({
    post_token : {type : String},
    author : {type : String},
    author_token : {type : String},
    title : {type : String},
    text : {type : String},
    date : {type : String},
    photo : {type : String},
    like : {type : Number}
})

var Comment_Schema = mongoose.Schema({
    author : {type : String},
    author_token : {type : String},
    text :  {type : String},
    post_token : {type : String},
    comment_token : {type : String},
    date : {type : String}
})


var User = mongoose.model('user', User_Schema)
var Ah = mongoose.model('ah', Ah_Schema)
var Na = mongoose.model('na', Na_Schema)
var NaDeal = mongoose.model('nadeal', NaDeal_Schema)
var Ba = mongoose.model('ba', Ba_Schema)
var BaDeal = mongoose.model('badeal', BaDeal_Schema)
var Da = mongoose.model('da', Da_Schema)
var Comment = mongoose.model('comment', Comment_Schema)



exports.db = db
exports.User = User
exports.Ah = Ah
exports.Na = Na
exports.NaDeal = NaDeal
exports.Ba = Ba
exports.BaDeal = BaDeal
exports.Da = Da
exports.Comment = Comment