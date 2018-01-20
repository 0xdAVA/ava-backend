module.exports = Na

function Na(app, db, RandomString, multer, request, moment) {

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './Na')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/na/post/add', upload.single('file') ,(req, res)=>{
        var body = req.body
        db.User.findOne({
            user_token : body.user_token
        }, (err, data)=>{
            if(err){
                console.log('/na/post/add userfind Error')
                throw err
            }
            else if(data){
                var save_post = new db.Na({
                    state : 0,
                    title : body.title,
                    text : body.text,
                    date : moment().format('YYYY-MM-DD, h:mm:ss A'),
                    quality_status : body.quality_status,
                    tag : body.tag,
                    profile_img : data.profile_img,
                    author : body.username,
                    author_token : body.user_token,
                    post_token : RandomString.generate(10),
                    send_type : body.send_type,
                    photo : "http://soylatte.kr:6974/"+req.file.path
                })

                save_post.save((err)=>{
                    if(err){
                        console.log('/na/post/add postsave Error')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"포스트 성공"})
                    }
                })
            }
        })

    })

    app.post('/na/post/list', (req, res)=>{
        db.Na.find({ state : 0 },(err, data)=>{
            if(err){
                console.log('/na/post/list postfind Error')
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

    app.post('/na/post/view', (req, res)=>{
        var body = req.body
        db.Na.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/na/post/view postfind Error')
                throw err
            }
            else if(data){
                res.send(200, data)
            }
            else {
                res.send(400, {success:false, message:"글을 찾을수 없습니다"})
            }
        })
    })

    app.post('/na/comment/add', (req, res)=>{
        var body = req.body
        var save_comment = new db.Comment({
            author : body.username,
            author_token : body.user_token,
            text : body.text,
            post_token : body.post_token,
            comment_token : RandomString.generate(10),
            date : moment.format('YYYY-MM-DD, h:mm:ss A')
        })

        save_comment.save((err)=>{
            if(err){
                console.log('/na/comment/add')
            }
            else{
                res.send(200, {success:true, message:"댓글등록 성공"})
            }
        })
    })

    app.post('/na/deal/add', (req, res)=>{
        var body = req.body
        db.Na.fineOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/na/deal/add postfind Error')
                throw err
            }
            else if(data){
                var save_nadeal = new db.NaDeal({
                    deal_token : RandomString.generate(10),
                    master_token : body.master_token,
                    slave_token : body.slave_token,
                    post_token : body.post_token,
                    master_name : body.master_name,
                    slave_name : body.slave_name,
                    address : '',
                    state : 0,
                    delivery_number : '',
                    delivery_code : '',
                    item : data,
                    comment : []
                })
                save_nadeal.save((err)=>{
                    if(err){
                        console.log('/na/deal/add deal save Error')
                        throw err
                    }
                    else {
                        db.Na.update({
                            post_token : body.post_token
                        }, {$set:{state : 1}}, (err)=>{
                            if(err){
                                console.log('/na/deal/add poststate update Error')
                                throw err
                            }
                            else {
                                res.send(200, {success:true, message:"asdf"})
                            }
                        })
                    }
                })
            }
        })

    })

    app.post('/na/deal/comment', (req, res)=>{
        var body = req.body
        db.NaDeal.findOne({
            deal_token : body.deal_token
        }, (err, data)=>{
            if(err){
                console.log('/na/deal/comment dealfind Error')
                throw err
            }
            else if(data){
                var array = new Array()
                array = data.comment
                array.push({username : body.username, message : body.message})
                db.Nadeal.update({
                    deal_token : body.deal_token
                }, {$set:{comment:array}}, (err)=>{
                    if(err){
                        console.log('/na/deal/comment commentupdate Error')
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

    app.post('/na/deal/delivery', (req, res)=>{
        var body = req.body
        db.NaDeal.update({
            deal_token : body.deal_token
        }, {$set:{delivery_number:body.delivery_number, delivery_code : body.delivery_code}}, (err)=>{
            if(err){
                console.log('/na/deal/delivery update Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"asdf"})
            }
        })
    })

    app.post('/na/deal/address', (req, res)=>{
        var body = req.body
        db.NaDeal.update({
            deal_token : body.deal_token
        }, {$set:{address : body.address}}, (err)=>{
            if(err){
                console.log('/na/deal/address addressupdate Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"Asdf"})
            }
        })
    })

    app.post('/na/deal/delivery/search', (req, res)=>{
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

    app.post('/na/deal/complete', (req, res)=>{
        var body = req.body
        db.Na.update({
            post_token : body.post_token
        }, {$set:{state:2}}, (err)=>{
            if(err){
                console.log('/na/deal/complete state udpate Error')
                throw err
            }
            else{
                db.NaDeal.update({
                    deal_token : body.deal_token
                }, {$set:{state:1}}, (err)=>{
                    if(err){
                        console.log('/na/deal/complete state update Error2')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"asdf"})
                    }
                })
            }
        })
    })

}