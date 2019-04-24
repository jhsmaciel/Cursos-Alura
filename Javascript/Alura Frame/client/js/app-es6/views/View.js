export class View {
    constructor(elemento){
        this._elemento = elemento
    }

    template(){
        new Error('É necessário implementação _template.')
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}