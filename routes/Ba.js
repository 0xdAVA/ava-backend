module.exports = Ba

function Ba(app, db, RandomString, multer, request, moment) {

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './Ba')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/ba/post/add', upload.single('file'),(req, res)=> {
        var body = req.body
        db.User.findOne({
            user_token : body.user_token
        }, (err, data)=>{
            if(err){
                console.log('/ba/post/add userfind Error')
                throw err
            }
            else if(data){
                var save_post = new db.Ba({
                    type : body.type,
                    state : 0,
                    title : body.title,
                    text : body.text,
                    date : moment().format(),
                    quality_status : body.quality_status,
                    tag : body.tag,
                    profile_img : data.profile_img,
                    author : body.username,
                    author_token : body.user_token,
                    post_token : RandomString.generate(10),
                    send_type : body.send_type,
                    photo : "http://soylatte.kr:3000/"+req.file.path,
                    comment :{type : Array}
                })
                save_post.save((err)=>{
                    if(err){
                        console.log('/ba/post/add postsave Error')
                        throw err
                    }
                    else {
                        res.send(200, "asdfasfasdf")
                    }
                })
            }
        })

    })

    app.post('/ba/post/list', (req, res)=>{
        var body = req.body
        db.Ba.find({
            type : 0
        }, (err, data)=>{
            if(err){
                console.log('/ba/post/list postfind Error')
                throw err
            }
            else if(data[0]){
                res.send(200, data)
            }
            else {
                res.send(200, [])
            }
        })
    })

    app.post('/ba/post/view', (req, res)=>{
        var body = req.body
        db.Ba.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/ba/post/view postfind Error')
                throw err
            }
            else if(data){
                res.send(200, data)
            }
            else {
                res.send(400, "Asdfasdfasd")
            }
        })
    })

    app.post('/ba/comment/add', upload.single('file') ,(req, res)=>{
        var body = req.body
        db.Ba.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/ba/comment/add postfind Error')
                throw err
            }
            else if(data){
                var array = new Array()
                array = data.comment
                array.push({
                    title : body.title,
                    text : body.text,
                    quality_status : body.quality_status,
                    tag : body.tag,
                    author : body.username,
                    author_token : body.user_token,
                    send_type : body.send_type,
                    photo : "http://soylatte.kr:3000/"+req.file.path
                })
                db.Ba.update({
                    post_token : body.post_token
                }, {$set:{comment : array}}, (err)=>{
                    if(err){
                        console.log('/ba/comment/add comment update Error')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"asdfasdfasdf"})
                    }
                })
            }
        })
    })

    app.post('/ba/deal/add', (req, res)=>{
        var body = req.body
        db.User.findOne({
            user_token : master_token
        }, (err, master_user_data)=>{
            if(err){
                console.log('/ba/deal/add masteruser find Error')
                throw err
            }
            else if(master_user_data){
                db.User.findOne({
                    user_token : body.slave_token
                }, (err, slave_user_data)=>{
                    if(err){
                        console.log('/ba/deal/add slaveruser find Error')
                        throw err
                    }
                    else if(slave_user_data){
                        var save_deal = new db.BaDeal({
                            deal_token : RandomString.generate(10),
                            master_token : body.master_token,
                            slave_token : body.slave_token,
                            master_name : body.master_name,
                            slave_name : body.slave_name,
                            ba_master : master_user_data,
                            ba_slave : slave_user_data,
                            status : 0,
                            master_delivery_number : '',
                            master_delivery_code : '',
                            slave_delivery_number : '',
                            slave_delivery_code : '',
                            master_address : '',
                            slave_address : '',
                            comment : []
                        })
                        save_deal.save((err)=>{
                            if(err){
                                console.log('/ba/deal/add dealadd Error')
                                throw err
                            }
                            else {
                                db.Ba.update({
                                    post_token : body.post_token
                                }, {$set:{state: 1}}, (err)=>{
                                    if(err){
                                        console.log('/ba/deal/add poststate Error')
                                        throw err
                                    }
                                    else{
                                        res.send(200, {success:true, message:"asdfas"})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    })

    app.post('/ba/deal/master_delivery', (req, res)=>{
        var body = req.body
        db.BaDeal.update({
            deal_token : body.deal_token
        }, {$set:{master_delivery_code:body.master_delivery_code, master_delivery_number:body.master_delivery_number}}, (err)=>{
            if(err){
                console.log('/ba/deal/master_delivery update Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"Asdf"})
            }
        })
    })

    app.post('/ba/deal/slave_delivery', (req, res)=>{
        var body = req.body
        db.BaDeal.update({
            deal_token : body.deal_token
        }, {$set:{slave_delivery_code:body.slave_delivery_code, slave_delivery_number:body.slave_delivery_number}}, (err)=>{
            if(err){
                console.log('/ba/deal/slave_delivery update Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"Asdf"})
            }
        })
    })

    app.post('/ba/deal/master_address', (req, res)=>{
        var body = req.body
        db.BaDeal.update({
            deal_token : body.deal_token
        }, {$set:{master_address:body.master_address}}, (err)=>{
            if(err){
                console.log('/ba/deal/master_address update Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"Asdfasdfa"})
            }
        })
    })

    app.post('/ba/deal/slave_address', (req, res)=>{
        var body = req.body
        db.BaDeal.update({
            deal_token : body.deal_token
        }, {$set:{slave_address:body.slave_address}}, (err)=>{
            if(err){
                console.log('/ba/deal/slave_address update Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"Asdfasdfa"})
            }
        })
    })

    app.post('/ba/deal/comment', (req, res)=> {
        var body = req.body
        db.BaDeal.findOne({
            deal_token : body.deal_token
        }, (err, data)=>{
            if(err){
                console.log('/ba/deal/comment')
                throw err
            }
            else if(data){
                var array = new Array()
                array = data.comment
                array.push({username : body.username, message : body.message})
                db.BaDeal.update({
                    deal_token : body.deal_token
                }, {$set:{comment:array}}, (err)=>{
                    if(err){
                        console.log('/ba/deal/comment commentupdate Error')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"asdfa"})
                    }
                })
            }
            else {
                res.send(400, {success:false, message:"Not Founded"})
            }
        })
    })

    app.post('/ba/deal/delivery/search', (req, res)=>{
        var body = req.body
        var options = { method: 'GET',
            url: 'http://info.sweettracker.co.kr/api/v1/trackingInfo',
            qs:
                {
                    t_key: 'Ll6DqNHj70Gpqnl03ev2aQ',
                    t_code: body.code,
                    t_invoice: body.number
                },
            headers:
                {
                    'postman-token': '123d4c9c-5b29-7b12-361a-d28320f6f13e',
                    'cache-control': 'no-cache'
                }
        };

        request(options, (error, response, body)=>{
            if (error) throw new Error(error);
            var data = JSON.parse(body)
            res.send(200, data)
        });
    })


}