class NegociacaoDAO {
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes'
    }

    adiciona(negociacao){
        return new Promise((resolve,reject)=> {
            let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .add(negociacao);
            
            request.onsuccess = e => resolve('Negociação adicionada com sucesso')

            request.onerror = e => {
                reject('Não foi possível adicionar a negociacao')
            }
        });
    }
    listaTodos(){
        return new Promise((resolve,reject)=>{
            let cursor = this._connection.transaction([this._store],'readwrite')
            .objectStore('negociacoes')
            .openCursor();
            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual){
                    let dado = atual.value;
                        negociacoes.push(new Negociacao(new Date(dado._data),dado._quantidade,dado._valor));
                        atual.continue();
                } else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.result);
                reject('Não foi possível listar as negociações');
            }

        });
    }
    apagarDados(){
        return new Promise((resolve,reject)=> {
            let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore('negociacoes')
            .clear();

            request.onsuccess = e => resolve('Negociacões apagadas com sucesso')

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível apagar as negociações')
            }
        });
    }
}