module.exports = function(app) {
    app.get('/',function (req, res){
        console.log('Entrou pagamento')
        res.send( '<h1>dadsad</h1> <a href="#">sdasd</a>')
    })
}