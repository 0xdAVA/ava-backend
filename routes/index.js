module.exports = index

function index(app, db){

    app.get('/', (req, res)=>{
        res.send('Hello')
    })

}