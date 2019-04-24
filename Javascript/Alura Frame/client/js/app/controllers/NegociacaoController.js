'use strict';

System.register(['../models/ListaNegociacao', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../services/ConnectionFactory', '../helpers/Bind', '../models/Negociacao', '../dao/NegociacaoDAO'], function (_export, _context) {
    "use strict";

    var ListaNegociacao, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, ConnectionFactory, Bind, Negociacao, NegociacaoDAO, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacao) {
            ListaNegociacao = _modelsListaNegociacao.ListaNegociacao;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_servicesConnectionFactory) {
            ConnectionFactory = _servicesConnectionFactory.ConnectionFactory;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoController', NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._ordemAtual = '';
                    this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoes-view')), 'adiciona', 'esvazia', 'ordena');
                    this._mensagem = this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-views')), 'texto');
                    this._service = new NegociacaoService();
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacao.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            return _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._mensagem.texto = mensagem + '';
                            _this2._listaNegociacao.adiciona(negociacao);
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro + '';
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacao.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this3._listaNegociacao.adiciona(negociacao);
                            });
                            if (negociacoes.length != 0) {
                                _this3._mensagem.texto = 'Negociações do período importadas';
                            }
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textToDate(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagarDados();
                        }).then(function (msg) {
                            _this4._mensagem.texto = msg;
                            _this4._listaNegociacao.esvazia();
                        });
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0;
                        this._inputData.focus();
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (coluna != this._ordemAtual) {
                            this._listaNegociacao.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                            this._ordemAtual = coluna;
                        } else {
                            this._listaNegociacao.ordena(function (a, b) {
                                return b[coluna] - a[coluna];
                            });
                            this._ordemAtual = '';
                        }
                    }
                }]);

                return NegociacaoController;
            }());

            _export('NegociacaoController', NegociacaoController);

            negociacaoController = new NegociacaoController();
            function currentInstance() {
                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map