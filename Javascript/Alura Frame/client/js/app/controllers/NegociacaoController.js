class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona','esvazia'
        );
        this._mensagem = this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-views')),
            'texto'
        );
    }

    adiciona(event){
        event.preventDefault();
        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação cadastrada com sucesso';
        this._limpaFormulario();
    }

    importaNegociacoes(){
        let xhr =  new XMLHttpRequest()
        xhr.open('GET','http://localhost:3000/negociacoes/semana');
        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log('Topzera')
                    JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    .forEach(element => {
                        this._listaNegociacao.adiciona(element);
                    });
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                } else {
                    new Error('Não foi possível fazer a requisição')
                    console.log(xhr.responseText)
                    this._mensagem.texto = 'Não foi possível obter as negociações';
                }
            }
        }
        xhr.send()
    }
                                                                                                                                                                                        
    _criaNegociacao(){
        return new Negociacao(  
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    apaga(){
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._listaNegociacao.esvazia();
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}