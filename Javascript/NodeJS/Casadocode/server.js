const http = require('http');


const server = http.createServer(function(req,res){
    let html = ''
    if(req.url == '/'){
        html = `
        <!DOCTYPE HTML>
        <html lang=”pt-br”>
            <head>
                <meta charset="UTF-8">
                <title>Node é TOP</title>
            </head>
            <body>
                <h1>topzera</h1>
            </body>
        </html>
    `
    } else if (req.url == '/livros'){
        html = `
        <!DOCTYPE HTML>
        <html lang=”pt-br”>
            <head>
                <meta charset="UTF-8">
                <title>Node é TOP</title>
            </head>
            <body>
                <h1>Livros</h1>
            </body>
        </html>
    `
    }
    res.end(html)
});

server.listen(3000);

