module.exports = auth

function auth(app, db, RandomString){

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
                var save_user = {
                    username : body.username,
                    id : body.id,
                    password : body.password,
                    user_token : RandomString.generate(10),
                    facebook_token : ''
                }
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
            
        })
    })

    app.post('/auth/edituser', (req, res)=>{
        var body = req.body
    })

}