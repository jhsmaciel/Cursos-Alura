import {View} from './View';
export class MensagemView extends View {
    constructor(elemento){
        super(elemento);
    }
    template(model){
        return typeof (model) != 'object' ? `<p class='alert alert-info'>${model}</p>`: '<p></p>';
    }
}