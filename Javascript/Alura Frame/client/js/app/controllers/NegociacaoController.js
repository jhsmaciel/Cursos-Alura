class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacao = new ListaNegociacao();
        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
        this._negociacoesView.update(this._listaNegociacao);
        this._mensagem = new Mensagem('');
        this._mensagemView = new MensagemView($('#mensagem-views'));
    }

    adiciona(event){
        event.preventDefault();
        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacao);
        this._mensagem.texto = 'Negociação cadastrada com sucesso'
        console.log(this._mensagem.texto)
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
    }
    _criaNegociacao(){
        return new Negociacao(  
            dateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}