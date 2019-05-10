$("#placar").click(mostraPlacar)
$("#sync").click(sincronizaPlacar)

function inserePlacar() {
    let tabela = $('.placar').find('tbody')
    let usuario = $("#select").val();
    let numPalavras= $('#palavra-contador').text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".remover").click(remover)
    tabela.prepend(linha)
    $(".placar").slideDown(500);
    scrollPlacar(1000)
}
function remover(event) {
    event.preventDefault();
    var line =$(this).parent().parent()
    line.fadeOut(500);
    setTimeout(() => {
        line.remove()
    }, 500);
}
function scrollPlacar() {
    var posPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: "100px"
    }, 500)
}

function novaLinha(usuario,numPalavras) {
    var linha = $("<tr>")
    var colunaUsuario = $("<td>").text(usuario)
    var colunaPalavras = $("<td>").text(numPalavras)
    var colunaRemover = $('<td>');
    
    var link = $("<a>").addClass('remover').attr("href","#")
    var icone = $("<i>").addClass("small red-text material-icons").text("delete")
    
    link.append(icone)

    colunaRemover.append(link)

    linha.append(colunaUsuario)
    linha.append(colunaPalavras)
    linha.append(colunaRemover)

    return linha;
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(500)
}

function sincronizaPlacar() {
    let placar = []
    let placarHtml = $("tbody>tr");
    placarHtml.each(function(){
        var user = $(this).find("td:nth-child(1)").text()
        var palavra = $(this).find("td:nth-child(2)").text()
        let dado = {
            usuario: user,
            pontos: palavra
        }
        placar.push(dado)
    });
    placar.pop();
    var dados = {
        placar: placar
    };
    $.post("/placar",dados,function(){
        console.log("Salvou o placar no servidor!")
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");
    })
    .fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
    })
    .always(function(){
        setTimeout(() => {
            $(".tooltip").tooltipster("close");
        }, 1000);
    });
}

function atualizaPlacar(){
    $.get("/placar",function (data) {
        $(data).each(function(){
            let tabela = $('.placar').find('tbody')
            var linha = novaLinha(this.usuario,this.pontos)
            tabela.prepend(linha)
            linha.find(".remover").click(remover)
        });
    })
}