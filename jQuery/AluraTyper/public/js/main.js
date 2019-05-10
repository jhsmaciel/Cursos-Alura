var tempoInit = $('#tempo').text()
var textArea = $('.texto-digitacao');
$(  
    function() {
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    inicializaMarcadores()
    $('#reiniciar').click(reiniciar);
    atualizaPlacar()
    $("#select").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: 'custom'
    });
})

function atualizaTamanhoFrase() {
    var qtdPalavras = $('.frase').text().split(' ').length
    var liPalavras = $('#palavras').text(qtdPalavras);
    
    textArea.on("input", function(){
        var conteudo = textArea.val()
        $('#palavra-contador').text(conteudo.split(/\S+/).length-1)
        var qtdCaracter = textArea.val().length
        $('#quantidade-caracter').text(qtdCaracter)
    });
}

function inicializaContador(){
    var qtdPalavrasContador = textArea.length;
    $('#palavra-contador').text(qtdPalavrasContador-1);
}

function inicializaCronometro() {
    textArea.one('focus',function(){
        let tempoRes = $('#tempo').text()
        $('#reiniciar').attr('disabled',true)
        var interval = setInterval(function() {
            tempoRes--
            if(tempoRes>=0){
                $('#tempo').text(tempoRes);
            } else {
                clearInterval(interval)
                finalizaJogo()
            }
        },1000)
    });
}

function finalizaJogo() {
    textArea.attr("disabled",true)
    textArea.addClass('texto-desativado')
    $('#reiniciar').attr('disabled',false)
    inserePlacar();
}

function inicializaMarcadores() {
    let frase = $(".frase").text();
    textArea.on('input',function(){
        var digitado = textArea.val()
        var comparavel = frase.substr(0,digitado.length)
        if(digitado == comparavel){
            textArea.removeClass('texto-incorreto')
            textArea.addClass('texto-correto')
        } else {
            textArea.removeClass('texto-correto')
            textArea.addClass('texto-incorreto')
        }
    });
}

function atualizaTempoInit(tempo) {
    tempoInit = tempo
    $("tempo").text(tempo);
}

function reiniciar() {
    textArea.val('');
    textArea.attr("disabled",false);
    $('#palavra-contador').text(0);
    $('#quantidade-caracter').text(0);
    $('#tempo').text(tempoInit);
    inicializaCronometro();
    textArea.removeClass('texto-desativado');
    textArea.removeClass('texto-correto');
    textArea.removeClass('texto-incorreto');
}
