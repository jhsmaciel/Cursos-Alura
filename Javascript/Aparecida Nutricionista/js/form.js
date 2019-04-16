let button = document.querySelector('#adicionar-paciente');



button.addEventListener('click', () =>  {
        event.preventDefault();
        let form = document.querySelector('#form-add')
        //setando o objeto Paciente
        let paciente = setPaciente(form);
        let mensagem = document.querySelector("#mensagem");
        
        if(!validaPaciente(paciente)){
            mensagem.textContent = 'Erro ao cadastrar';
            mensagem.classList = 'mensagem-erro'
            return;
        }  
        adicionaPaciente(paciente);
        mensagem.textContent = 'Cadastrado com Sucesso';
        mensagem.classList = 'mensagem-success'

})

function adicionaPaciente(paciente) {
    // Obtendo o pai dos elementos
    let tabela = document.querySelector("#tabela-pacientes")
    // Fixando o filho com os netos no pai
    tabela.appendChild(makeTr(paciente));
}

function makeTr(paciente){
    let pacienteTr = document.createElement('tr')
        pacienteTr.classList.add('paciente');
    // Fixando elementos 
    pacienteTr.appendChild(makeTd(paciente.nome,'info-nome'))
    pacienteTr.appendChild(makeTd(paciente.peso,'info-peso'))
    pacienteTr.appendChild(makeTd(paciente.altura,'info-altura'))
    pacienteTr.appendChild(makeTd(paciente.gordura,'info-gordura'))
    pacienteTr.appendChild(makeTd(paciente.imc,'info-imc'));
    return pacienteTr;
}

function makeTd (conteudo, classe){
    // Criando elementos
    let td =  document.createElement('td');
    td.classList = classe;
    td.textContent = conteudo;
    return td;
}

function setPaciente(form){
    let paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcImc(form.peso.value,form.altura.value)
    }
    return paciente;
}

function validaPaciente(paciente){
    if(paciente.nome != '' && paciente.gordura != '' || paciente.gordura < 0 || paciente.gordura > 100){
        if( paciente.peso <= 0 || paciente.peso > 500 ){
            seeError('peso')    
            return false;
        } else if ( paciente.altura <= 0 || paciente.altura > 3 ){
            seeError('altura')
            return false;
        } else {
            return true;
        }
    } else {
        alert('Nome inválido e/ou gordura inválida')
    }
}

function seeError(atributo) {
    let att = document.getElementById(atributo);
    att.value = '';
    att.style.boxShadow = '0 0 5px red';
    if (atributo == 'peso'){
        att.placeholder = atributo+' inválido'
        return; 
    }
    att.placeholder = atributo+' inválida'; 
}

function closeShadow() {
    let peso = document.getElementById('peso')
    let altura = document.getElementById('altura')
    peso.placeholder = 'digite o peso do seu paciente'
    peso.style.boxShadow = 'none';
    altura.placeholder = 'digite a altura do seu paciente'
    altura.style.boxShadow = 'none';  
}