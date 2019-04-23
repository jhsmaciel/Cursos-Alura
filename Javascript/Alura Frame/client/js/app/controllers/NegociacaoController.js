class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._ordemAtual = '';
        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona','esvazia','ordena'
        );
        this._mensagem = this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-views')),
            'texto'
        );
        this._init();
    }

    _init(){
        new NegociacaoService()
            .lista()
            .then(negociacoes => 
                negociacoes.forEach( 
                    negociacao => this._listaNegociacao.adiciona(negociacao)))
            .catch( erro => this._mensagem.texto = erro);
        
        setInterval(()=>
            this.importaNegociacoes(),
        3000)
    }

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        new NegociacaoService()
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem+''; 
                this._limpaFormulario();  
            })
            .catch(erro => this._mensagem.texto = erro+'');
    }

    importaNegociacoes(){
        let negService = new NegociacaoService();
        negService
        .obterAllNegociacoes()
        .then(negociacoes => negociacoes
                                .filter( negociacao => !this._listaNegociacao.negociacoes
                                    .some(negociacaoExistente => 
                                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                                    )))
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
        })
        .catch(erro => this._mensagem.texto = erro)
    }
                                                                                                                                                                                        
    _criaNegociacao(){
        return new Negociacao(  
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    apaga(){
        ConnectionFactory
            .getConnection()
            .then( connection => new NegociacaoDAO(connection))
            .then( dao => dao.apagarDados())
            .then( msg => { 
                this._mensagem.texto = msg
                this._listaNegociacao.esvazia()
            });
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

    ordena(coluna){
        if (coluna != this._ordemAtual){
            this._listaNegociacao.ordena((a, b) => a[coluna] - b[coluna])
            this._ordemAtual = coluna;
        } else {
            this._listaNegociacao.ordena((a, b) => b[coluna] - a[coluna])
            this._ordemAtual = '';
        }
    }
}