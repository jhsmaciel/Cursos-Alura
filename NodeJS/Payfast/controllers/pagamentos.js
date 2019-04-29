module.exports = function(app) {
    app.get('/pagamentos',function (req, res){
        console.log('Entrou pagamento')
        res.send( '<h1>dadsad</h1> <a href="#">sdasd</a>')
    });

    app.post('/pagamentos/pagamento', function(req,res){
        var pagamento = req.body;

        console.log('processando uma requisição de um novo pagamento');
        pagamento.status = 'Criado'
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory();

        var PagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        PagamentoDAO.salva(pagamento,function(erro, rs){
            if(erro){
                console.log('Erro ao inserir no banco: '+erro)
                res.status(400).send(erro);
                return;
            }
            console.log('Pagamento em criação...')
            res.json(pagamento);
        })
    });
}