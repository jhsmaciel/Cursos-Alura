let filtro = document.querySelector('#filtrar-tabela');

filtro.addEventListener('input',function(){
    
    let pacientes = document.querySelectorAll('.paciente');

    if(this.value.length > 0){
        for (let i = 0; i < pacientes.length; i++) {
            const paciente = pacientes[i];
            let nome = paciente.querySelector('.info-nome').textContent;
            let expressao = new RegExp(this.value,'i')
            if ( !expressao.test(nome) &&  nome != '' ){
                paciente.classList.add('invisivel');
            }
        }    
    } else  {
        for (let i = 0; i < pacientes.length; i++) {
            const paciente = pacientes[i];
            paciente.classList.remove('invisivel');
        }
    }
})