module.exports = Ba

function Ba(app, db, RandomString, multer, request, moment) {

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './Na')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(10)+'.'+file.mimetype.split('/')[1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/ba/post/add', (req, res)=>{

    })

    app.post('/ba/post/list', (req, res)=>{

    })

    app.post('/ba/post/view', (req, res)=>{

    })

    app.post('/ba')

}