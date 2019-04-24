const LivroDAO = require('../infra/LivroDAO');
const db = require('../../config/database');
const bookDAO = new LivroDAO(db);
module.exports = (app) => {
    app.get('/',function(req,res){
        res.send(`
               <!DOCTYPE HTML>
               <html lang=”pt-br”>
                   <head>
                       <meta charset="UTF-8">
                       <title>Node é TOP</title>
                   </head>
                   <body>
                       <h1>Node éhh TOP</h1>
                   </body>
           `);
    });
    app.get('/livros',function(req,res){
        bookDAO.lista()
            .then(livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });
    app.get('/livros/form/:id',function(req,res){
        const id = req.params.id;
        
        bookDAO.buscaPorId(id)
            .then(livro => res.marko(require('../views/livros/form/form.marko'), { livro: livro }))
            .catch(erro => console.log(erro));
    });
    app.post('/livros',function(req,res){
        console.log(req.body);
        bookDAO.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });
    app.delete('/livros/:id', function(req,res){
        const id = req.params.id;

        bookDAO.remove(id)
        .then(()=> res.status(200).end())
        .catch(erro => console.log(erro));
    });
}