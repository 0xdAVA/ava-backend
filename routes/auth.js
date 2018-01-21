module.exports = auth

function auth(app, db, RandomString, multer){

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './profile_img')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/auth/register', (req, res)=>{
        var body = req.body
        db.User.findOne({
            id : body.id
        }, (err, data)=>{
            if(err){
                console.log('/auth/register userfind Error')
                throw err
            }
            else if(data){
                res.send(409, {success:false, message:"Already In Database"})
            }
            else{
                var save_user = new db.User({
                    username : body.username,
                    id : body.id,
                    password : body.password,
                    user_token : RandomString.generate(10),
                    facebook_token : '',
                    profile_img : ''
                })
                save_user.save((err)=>{
                    if(err){
                        console.log('/auth/register usersave Error')
                        throw err
                    }
                    else {
                        res.send(200, save_user)
                    }
                })
            }

        })
    })

    app.post('/auth/login', (req, res)=>{
        var body = req.body
        db.User.findOne({
            id : body.id
        },(err, data)=>{
            if(err){
                console.log('/auth/login userfind Error')
                throw err
            }
            else if(data){
                if(data.password == body.password){
                    res.send(200, data)
                }
                else if(data.password != body.password){
                    res.send(403, {success:false, message:"로그인 실패"})
                }
            }
            else {
                res.send(401, {success:false, message:"로그인 실패"})
            }
        })
    })

    app.post('/auth/edituser', (req, res)=>{
        var body = req.body
        db.User.update({
            id : body.id
        },{$set:{username : body.username, password : body.password}}, (err)=>{
            if(err){
                console.log('/auth/edituser useredit Error')
                throw err
            }
            else {
                db.User.findOne({
                    id : body.id
                },(err, data)=>{
                    if(err){
                        console.log('/auth/edituser userfind Error')
                        throw err
                    }
                    else if(data){
                        res.send(200, data)
                    }
                    else {
                        res.send(401, {success:false, message:"데이터를 찾을수 없음"})
                    }
                })
            }
        })
    })

    app.post('/auth/auto', (req, res)=>{
        var body = req.body
        db.User.findOne({
            user_token : body.token
        },(err, data)=>{
            if(err){
                console.log('/auth/auth asjhgaksdjg')
                throw err
            }
            else if(data){
                res.send(200, data)
            }
            else {
                res.send(400, "Asdfasdf")
            }
        })
    })

    app.post('/auth/edituser/img', upload.single('profile_img'), (req, res)=>{
        var body = req.body
        db.User.update({
            id : body.id
        },{$set:{profile_img : "http://soylatte.kr:3000/"+req.file.path}}, (err)=>{
            if(err){
                console.log('/auth/edituser/img useredit Error')
                throw err
            }
            else {
                db.User.findOne({
                    id : body.id
                }, (err, data)=>{
                    if(err){
                        console.log('/auth/edituser/img userfind Error')
                        throw err
                    }
                    else if(data){
                        res.send(200, data)
                    }
                    else{
                        res.send(401, {success:false, message:"데이터를 찾을수 없음"})
                    }
                })
            }
        })
    })


}