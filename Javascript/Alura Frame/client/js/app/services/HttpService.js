class HttpService {
    get(url){
        return new Promise((resolve,reject)=>{
            let xhr =  new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => 
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
                    } else {
                        new Error('Não foi possível fazer a requisição')
                        reject(xhr.responseText)
                    }
                }
            }
            xhr.send()
        })
    }
    post(url,dado){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve('Negociação cadastrada com sucesso!')
                    }else {
                        new Error('Não foi possível cadastrar a negociação a requisição')
                        reject(xhr.responseText)
                    }
                }
            }
            xhr.send(JSON.stringify(dado));
        });
    }
}
