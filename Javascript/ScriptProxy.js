// Manuseiando proxy, e criando 'armadilhas para alteração/requisição desses valores'

class Pessoa {

    constructor(nome) {
        this._nome = nome;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    grita(frase) {
        return `${this._nome} grita ${frase}`;
    }
}

let pessoa = new Proxy(new Pessoa('Barney'), {

        get(target, prop, receiver) {
            if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {

                return function() {
                    console.log(`Interceptei o método: ${prop}, por isso estou exbindo essa mensagem!`);    
                    Reflect.apply(target[prop], target, arguments);       
                }
            }
            return Reflect.get(target, prop, receiver);
        }
    });

   console.log(pessoa.grita('Olá'));
    class Funcionario {

        constructor(email='') {
            this._email = email;
        }

        get email() {
            return this._email;
        }

        set email(email) {
            this._email = email;
        }
    }

    let proxFunc = new Proxy(new Funcionario(), {
        get(target,prop,receiver) {
            console.log('Armadilha aqui')
            return Reflect.get(target,prop,receiver);
        },
        set(target,prop,value,receiver) {
            console.log(`Valor antigo: ${target[prop]} , valor novo: ${value} da propriedade ${prop}`)
            return Reflect.set(target,prop,value,receiver);
        }
    })