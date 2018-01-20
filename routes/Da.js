module.exports = Da

function Da(app, db, RandomString, multer, request, moment) {

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './Da')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/da/post/add', upload.single('file') ,(req, res)=>{
        var body = req.body
        var save_da = new db.Da({
            post_token : RandomString.generate(10),
            author : body.author,
            author_token : body.author_token,
            title : body.title,
            text : body.text,
            date : moment().format('YYYY-MM-DD, h:mm:ss A'),
            photo : "http://soylatte.kr:6974/"+req.file.path,
            like : 0
        })

        save_da.save((err)=>{
            if(err){
                console.log('/da/post/add postsave Error')
                throw err
            }
            else{
                res.send(200, {success:true, message:"post Save Success"})
            }
        })

    })

    app.post('/da/post/list', (req, res)=>{
        db.Da.find((err, data)=>{
            if(err){
                console.log('/da/post/list postfind Error')
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

    app.post('/da/post/myda', (req, res)=>{
        var body = req.body
        db.Da.find({
            auther_token : body.user_token
        }, (err, data)=>{
            if(err){
                console.log('/ah/post/myda postfind Error')
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

    app.post('/da/post/view', (req, res)=>{
        var body = req.body
        db.Da.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/da/post/view postfind Error')
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

    app.post('/da/post/like', (req, res)=>{
        var body = req.body
        db.Da.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            console.log(body.post_token)
            if(err){
                console.log('/da/post/like postfind Error')
                throw err
            }
            else if(data){
                db.Da.update({
                    post_token : body.post_token
                }, {$set:{like : data.like+1}}, (err)=>{
                    if(err){
                        console.log('/da/post/like update Error')
                        throw err
                    }
                    else{
                        res.send(200, {success:true, message:"종아요 되었습니다"})
                    }
                })
            }
            else {
                res.send(303,"asdf")
            }
        })
    })

    app.post('/da/post/rank', (req, res)=>{
        var query = db.Da.find({}).sort({ "like" : -1}).limit(5)
        query.exec((err, data)=>{
            if(err){
                console.log('/da/post/rank rankfind Error')
                throw err
            }
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, [])
            }
        })
    })

    app.post('/da/post/search', (req, res)=>{
        var body = req.body
        db.Da.find({
            title : body.title
        }, (err, data)=>{
            if(err){
                console.log('/da/post/search postfind Error')
                throw err
            }
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, data)
            }
        })
    })

}