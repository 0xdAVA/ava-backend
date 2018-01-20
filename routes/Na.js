module.exports = Na

function Na(app, db, RandomString, multe, request, moment) {

    app.post('/na/post/add', (req, res)=>{
        var body = req.body
        var save_post = new db.Na({
            state : 0,
            title : body.title,
            text : body.text,
            date : moment().format()
        })
    })

    app.post('/na/post/list', (req, res)=>{

    })

    app.post('/na/post/view', (req, res)=>{

    })

    app.post('/na/comment/add', (req, res)=>{

    })

    app.post('/na/deal/add', (req, res)=>{

    })

}