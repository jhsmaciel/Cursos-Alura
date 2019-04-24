import {ListaNegociacao} from '../models/ListaNegociacao';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {ConnectionFactory} from '../services/ConnectionFactory';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoDAO} from '../dao/NegociacaoDAO';

export class NegociacaoController {
    
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
        this._service = new NegociacaoService();
        this._init();
    }

    _init(){
        this._service
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
        
            this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._mensagem.texto = mensagem+'';
                this._listaNegociacao.adiciona(negociacao); 
                this._limpaFormulario();  
            })
            .catch(erro => this._mensagem.texto = erro+'');
    }

    importaNegociacoes(){
        
        this._service
        .importa(this._listaNegociacao.negociacoes)
        .then(negociacoes => { 
            negociacoes.forEach(negociacao => 
            this._listaNegociacao.adiciona(negociacao));
            if(negociacoes.length != 0){
                this._mensagem.texto = 'Negociações do período importadas';
            }
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

let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
}