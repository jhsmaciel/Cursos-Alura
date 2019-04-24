export class ProxyFactory {
    static create(model,props, acao){
        return new Proxy(model,{
            get(target, prop, receiver){
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function) ){
                    return function(){
                        Reflect.apply(target[prop],target,arguments)
                        acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver){
                if (props.includes(prop)){
                    acao(value);
                }
                return Reflect.set(target,prop,value,receiver);
            }
        })
    }
}