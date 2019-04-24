'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDAO', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obterNegociacoesSemana',
                    value: function obterNegociacoesSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('http://localhost:3000/negociacoes/semana').then(function (negociacoes) {
                                return resolve(negociacoes);
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Não foi possível obter as negociacoes da semana');
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesSemanaRetrasada',
                    value: function obterNegociacoesSemanaRetrasada() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('http://localhost:3000/negociacoes/retrasada').then(function (negociacoes) {
                                return resolve(negociacoes);
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Não foi possível obter as negociacoes da semana');
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesSemanaAnterior',
                    value: function obterNegociacoesSemanaAnterior() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('http://localhost:3000/negociacoes/anterior').then(function (negociacoes) {
                                return resolve(negociacoes);
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Não foi possível obter as negociacoes da semana');
                            });
                        });
                    }
                }, {
                    key: 'obterAllNegociacoes',
                    value: function obterAllNegociacoes() {
                        return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (arrayNegociacoes) {
                            var arrayNego = [];
                            arrayNegociacoes.forEach(function (periodos) {
                                periodos.forEach(function (negociacao) {
                                    return arrayNego.push(negociacao);
                                });
                            });
                            return arrayNego;
                        }).catch(function (erro) {
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.adicionar(negociacao);
                        }).then(function () {
                            return 'Negociação cadastrada com sucesso';
                        }).catch(function () {
                            return "Não foi possível adicionar a negociação";
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function () {
                            return console.log('Não foi possível listar');
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {
                        return this.obterAllNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('Não foi possível importar as negociações');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map