module.exports = AppFacebook

function AppFacebook(app, db, RandomString, passport, AppFacebookStrategy) {

    passport.serializeUser((user, done)=>{
        console.log("serialize")
        done(null, user);
    });

    passport.deserializeUser((user, done)=>{
        console.log("deserialize")
        done(null, user);
    });

    passport.use(new AppFacebookStrategy({
        clientID : '1649437005348937',
        clientSecret : '5452e5edeb1623b12b87efd4692feb98',
    }, (accessToken, refreshToken, profile, done)=>{
        console.log('======== APP PROFILE ========')
        console.log(profile)
        done(null, profile)
    }));


    app.get('/facebook/app', passport.authenticate('facebook-token'), (req, res)=>{
        console.log("USER_TOKEN ==== " + req.param('access_token'));
        if(req.user){
            console.log(req.user)
            db.User.findOne({
                id : req.user.id
            }, (err, data)=>{
                if(err){
                    console.log('/facebook/app userfind Error')
                    throw err
                }
                else if(data){
                    res.send(200, data)
                }
                else {
                    var save_user = new db.User({
                        username : req.user.displayName,
                        id : req.user.id,
                        password : '',
                        user_token : RandomString.generate(10),
                        facebook_token : req.param('access_token'),
                        profile_img : req.user.photos[0].value
                    })
                    save_user.save((err)=>{
                        if(err){
                            console.log('/facebook/app usersave Error')
                            throw err
                        }
                        else{
                            res.send(200, save_user)
                        }
                    })
                }
            })
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });
}