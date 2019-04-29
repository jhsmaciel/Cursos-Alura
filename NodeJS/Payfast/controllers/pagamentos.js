module.exports = function(app){
    const PAGAMENTO_CRIADO = 'CRIADO';
    const PAGAMENTO_CANCELADO = 'CANCELADO';
    const PAGAMENTO_CONFIRMADO = 'CONFIRMADO';
    app.get('/pagamentos', function(req, res){
        console.log('Recebida requisicao de teste na porta 3000.')
        res.send('OK.');
    });

    app.delete('/pagamentos/pagamento/:id',function(req,res){
        var id = req.params.id;
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);
        var pagamento = {};
        pagamento.id = id;
        pagamento.status = PAGAMENTO_CANCELADO;
        pagamentoDao.atualiza(pagamento, function(erro){
            if(erro){
                res.status(400).send(erro);
                return;
            }
            console.log('Pagamento cancelado')
            res.status(204).send(pagamento);
        })
    });

    app.put('/pagamentos/pagamento/:id', function(req, res){
        var id = req.params.id;
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);
        var pagamento = {};
        pagamento.id = id;
        pagamento.status = PAGAMENTO_CONFIRMADO;
        pagamentoDao.atualiza(pagamento, function(erro){
            if(erro){
                res.status(400).send(erro);
                return;
            }
            console.log('Pagamento confirmado')
            res.send(pagamento);
        })
    });

    app.post('/pagamentos/pagamento', function(req, res){

        req.assert("forma_de_pagamento",
            "Forma de pagamento eh obrigatorio").notEmpty();
        req.assert("valor",
        "Valor eh obrigatorio e deve ser um decimal")
            .notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros){
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body;
        console.log('processando uma requisicao de um novo pagamento');

        pagamento.status = PAGAMENTO_CRIADO;
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado){
            if(erro){
                console.log('Erro ao inserir no banco:' + erro);
                res.status(500).send(erro);
            } else {
                pagamento.id = resultado.insertId;
                console.log('pagamento criado');
                res.location('/pagamentos/pagamento/' +
                        resultado.insertId);
                var response = {
                    dados_do_pagamento: pagamento,
                    links:[
                        {
                            href: 'http://localhost:3000/pagamentos/pagamento/'+ pagamento.id,
                            rel:'confimar',
                            method:'PUT'
                        },
                        {
                            href: 'http://localhost:3000/pagamentos/pagamento/'+ pagamento.id,
                            rel:'cancelar',
                            method:'DELETE'
                        }
                    ]
            }  
            res.status(201).json(response);
        }
        });
    });
}
