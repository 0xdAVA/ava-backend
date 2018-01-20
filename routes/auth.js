module.exports = auth

function auth(app, db){

    app.post('/auth/register', (req, res)=>{
        var body = req.body
    })

    app.post('/auth/login', (req, res)=>{
        var body = req.body
    })

    app.post('/auth/edituser', (req, res)=>{
        var body = req.body
    })

}