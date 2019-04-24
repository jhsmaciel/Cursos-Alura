'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_handleErrors',
                    value: function _handleErrors(res) {
                        if (res.ok) {
                            return res;
                        }
                        throw new Error(res.contentText);
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        // return fetch(url)
                        //     .then(res => this._handleErrors(res))
                        //     .then(res => res.json())

                        return new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url);
                            xhr.onreadystatechange = function () {

                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        resolve(JSON.parse(xhr.responseText).map(function (objeto) {
                                            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                        }));
                                    } else {
                                        new Error('Não foi possível fazer a requisição');
                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send();
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, dado) {
                        var _this = this;

                        return fetch(url, {
                            headers: { "Content-Type": "application/json" },
                            method: 'post',
                            body: JSON.stringify(dado)
                        }).then(function (res) {
                            return _this._handleErrors(res);
                        });
                        // return new Promise((resolve, reject) => {

                        //     let xhr = new XMLHttpRequest();
                        //     xhr.open("POST", url, true);
                        //     xhr.setRequestHeader("Content-Type", "application/json");
                        //     xhr.onreadystatechange = () => {
                        //         if(xhr.readyState == 4){
                        //             if(xhr.status == 200){
                        //                 resolve('Negociação cadastrada com sucesso!')
                        //             }else {
                        //                 new Error('Não foi possível cadastrar a negociação a requisição')
                        //                 reject(xhr.responseText)
                        //             }
                        //         }
                        //     }
                        //     xhr.send(JSON.stringify(dado));
                        // });
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map