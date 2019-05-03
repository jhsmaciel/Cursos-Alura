module.exports = function(app){
  const data = new Date();
  app.get('/pagamentos', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send(`Dia ${data.getDay()}, ${data.getHours()} horas e ${data.getMinutes()} minutos `);
  });
  app.get('/pagamentos/pagamento/:id',function(req,res){
    let id = req.params.id
    console.log(id)

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);
	
	var memcachedCliente = app.persistencia.memcachedCliente();

	cliente.get('pagamento-'+id, function(erro,result){
		if(erro || !result) {
			console.log('Não Encontrada')   
			return;
		}
		console.log(JSON.stringify(result)+ ' encontrada');
	});
    pagamentoDao.buscaPorId(id,function(erro,resultado){
      if(erro){ 
        res.status(400).send(erro)
        return
      } 
      console.log('Pagamento encontrado: '+ JSON.stringify(resultado))
      res.json(resultado)

    })
  });

  app.delete('/pagamentos/pagamento/:id', function(req, res){
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento cancelado');
        res.status(204).send(pagamento);
    });
  });

  app.put('/pagamentos/pagamento/:id', function(req, res){

    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento criado');
        res.send(pagamento);
    });

  });

  app.post('/pagamentos/pagamento', function(req, res){
    req.assert("forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body;
    console.log(pagamento);
    console.log('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
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
	  var memachedClient = app.persistencia.memachedClient();

	  cliente.set('pagamento-20',{'id': 20},10000,function(erro){
	    if(!erro) console.log('Chave add')
	  });
      if (pagamento.forma_de_pagamento == 'cartao'){
        var cartao = req.body["cartao"];
        console.log(cartao);

        var clienteCartoes = new app.servicos.clienteCartoes();

        clienteCartoes.autoriza(cartao,
            function(exception, request, response, retorno){
              if(exception){
                console.log(exception);
                res.status(400).send(exception);
                return;
              }
              console.log(retorno);

              res.location('/pagamentos/pagamento/' +
                    pagamento.id);

              var response = {
                dados_do_pagamanto: pagamento,
                cartao: retorno,
                links: [
                  {
                    href:"http://localhost:3000/pagamentos/pagamento/"
                            + pagamento.id,
                    rel:"confirmar",
                    method:"PUT"
                  },
                  {
                    href:"http://localhost:3000/pagamentos/pagamento/"
                            + pagamento.id,
                    rel:"cancelar",
                    method:"DELETE"
                  }
                ]
              }

              res.status(201).json(response);
              return;
        });


      } else {
        res.location('/pagamentos/pagamento/' +
              pagamento.id);

        var response = {
          dados_do_pagamanto: pagamento,
          links: [
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
                      + pagamento.id,
              rel:"confirmar",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/pagamentos/pagamento/"
                      + pagamento.id,
              rel:"cancelar",
              method:"DELETE"
            }
          ]
        }

        res.status(201).json(response);
      }
    }
    });

  });
}
