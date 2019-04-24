import {ProxyFactory} from '../services/ProxyFactory';
export class Bind {
    constructor(model, view, ...props){
        let proxy = ProxyFactory.create( model, props, model => view.update(model)
        );
        console.log();
        view.update(model);
        return proxy;
    }
}