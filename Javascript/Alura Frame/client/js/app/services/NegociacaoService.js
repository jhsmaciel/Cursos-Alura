class NegociacaoService{
    constructor(){
        this._http = new HttpService();
    }
    obterNegociacoesSemana(){
        return new Promise((resolve,reject)=>{
            this._http.get('http://localhost:3000/negociacoes/semana')
            .then(negociacoes => 
                resolve(negociacoes)
            )
            .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociacoes da semana')
                }
            );
        })
    }
    obterNegociacoesSemanaRetrasada(){
        return new Promise((resolve,reject)=>{
            this._http.get('http://localhost:3000/negociacoes/retrasada')
            .then(negociacoes => 
                resolve(negociacoes)
            )
            .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociacoes da semana')
                }
            );
        })
    }
    obterNegociacoesSemanaAnterior(){
        return new Promise((resolve,reject)=>{
            this._http.get('http://localhost:3000/negociacoes/anterior')
            .then(negociacoes => 
                resolve(negociacoes)
            )
            .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociacoes da semana')
                }
            );
        })
    }

    obterAllNegociacoes(){
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ]).then(arrayNegociacoes => {
            let arrayNego = [];
                arrayNegociacoes
                .forEach(periodos => {
                    periodos.forEach( negociacao => arrayNego.push(negociacao) )
                })
                return arrayNego;
            })
            .catch(erro => { throw new Error(erro) });
    }
    cadastra(negociacao){
        return new Promise((resolve,reject)=>
            ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDAO(connection))
                .then(dao => dao.adiciona(negociacao))
                .then( resolve('Negociação cadastrada com sucesso') )
                .catch( reject("Não foi possível adicionar a negociação"))
        )  
    }
    lista(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .catch(() => console.log('Não foi possível listar'))

    }
}