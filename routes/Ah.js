module.exports = Ah

function Ah(app, db, RandomString, multer, request, moment) {

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './Ah')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/ah/post/add', upload.single('file') ,(req, res)=>{
        var body = req.body

        var save_ah = new db.Ah({
            post_token : RandomString.generate(15),
            auther : body.username,
            auther_token : body.user_token,
            title : body.title,
            text : body.text,
            date : moment().format('YYYY-MM-DD, h:mm:ss A'),
            photo : "http://soylatte.kr:6974/"+req.file.path,
            like : 0
        })

        save_ah.save((err)=>{
            if(err){
                console.log('/ah/add ahsave Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"아껴쓰기 등록완료!"})
            }
        })

    })

    app.post('/ah/post/list', (req, res)=>{
        var body = req.body
        db.Ah.find((err, data)=>{
            if(err){
                console.log('/ah/post/list postfind Error')
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

    app.post('/ah/post/myah', (req, res)=>{
        var body = req.body
        db.Ah.find({
            auther_token : body.user_token
        }, (err, data)=>{
            if(err){
                console.log('/ah/myah postfind Error')
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

    app.post('/ah/post/view', (req, res)=>{
        var body = req.body
        db.Ah.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/ah/postiview postfind Error')
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

    app.post('/ah/post/like', (req, res)=>{
        var body = req.body
        db.Ah.findOne({
            post_token : body.post_token
        }, (err, data)=>{
            console.log(body.post_token)
            if(err){
                console.log('/ah/post/like postfind Error')
                throw err
            }
            else if(data){
                db.Ah.update({
                    post_token : body.post_token
                }, {$set:{like : data.like+1}}, (err)=>{
                    if(err){
                        console.log('/ah/post/like update Error')
                        throw err
                    }
                    else{
                        res.send(200, {success:true, message:"종아요 되었습니다"})
                    }
                })
            }
            else {
                res.send(400,"asdf")
            }
        })
    })

    app.post('/ah/post/rank', (req, res)=>{
        var query = db.Ah.find({}).sort({ "like" : -1}).limit(5)
        query.exec((err, data)=>{
            if(err){
                console.log('/ah/post/rank rankfind Error')
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

    app.post('/ah/comment/add', (req, res)=>{
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
                console.log('/ah/comment/add')
            }
            else{
                res.send(200, {success:true, message:"댓글등록 성공"})
            }
        })

    })


    app.post('/ah/comment/view', (req, res)=>{
        var body = req.body
        db.Comment.find({
            post_token : body.post_token
        }, (err, data)=>{
            if(err){
                console.log('/ah/comment/view commentfind Error')
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

}