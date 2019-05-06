var qtdPalavras = $('.frase').text().split(' ').length
var liPalavras = $('#palavras').text(qtdPalavras);
var textArea = $('.texto-digitacao');

textArea.on("input", function(){
    var conteudo = textArea.val()
    $('#palavra-contador').text(conteudo.split(/\S+/).length-1)
    var qtdCaracter = textArea.val().length
    $('#quantidade-caracter').text(qtdCaracter)
});

textArea.on('focus',function(){
    
});

function contadorPalavra(){
    
    var qtdPalavrasContador = textArea.length;
    $('#palavra-contador').text(qtdPalavrasContador);
    console.log(qtdPalavrasContador);
}