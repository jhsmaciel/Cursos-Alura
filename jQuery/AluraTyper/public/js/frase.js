$("#troca").click(fraseRandom)
$("#buscarF").click(buscaFrase)
function fraseRandom() {
    $("#spinner").show();
    $.get("/frases", function (data) {
    let fraseTempo = data[numberRandom(data.length)]
    $(".frase").text(fraseTempo.texto);
    $("#tempo").text(fraseTempo.tempo)
    atualizaTamanhoFrase();
    atualizaTempoInit(fraseTempo.tempo)
    inicializaMarcadores()
    })
    .fail(requisitar)
    .always(reqErrar)
    
}

function buscaFrase() {
    $("#spinner").show();
    var fraseId = {id: $("#frase-id").val() };
    $.get("/frases",fraseId,function (frase) {
        alteraFrase(frase)
    })
    .fail(requisitar)
    .always(reqErrar);
}

function requisitar(){
    $("#erro").stop().fadeIn(1000)
    setTimeout(() => {
        $("#erro").fadeOut(1000) 
    }, 1000);
}

function reqErrar(){
    $("#spinner").hide();
}

function numberRandom(num) {
    return Math.floor(Math.random() * num)
}

function alteraFrase(frase) {
    $(".frase").text(frase.texto);
    $("#tempo").text(frase.tempo)
    atualizaTamanhoFrase();
    atualizaTempoInit(frase.tempo)
    inicializaMarcadores()
}


