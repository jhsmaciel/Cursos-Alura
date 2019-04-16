let botao = document.querySelector('#botao-buscar');


botao.addEventListener('click',function(){
    var  xhr = new XMLHttpRequest();
    xhr.open('GET','https://api-pacientes.herokuapp.com/pacientes');
    xhr.addEventListener('load',function () { 
        let spanMsg = document.querySelector('#msg-http');
            if( xhr.status == 200){
                let pacientesBusca = JSON.parse(xhr.responseText);
                for (let i = 0; i < pacientesBusca.length; i++) {
                    const paciente = pacientesBusca[i];
                    adicionaPaciente(paciente);
                }
                spanMsg.classList = 'mensagem-success'
                spanMsg.textContent = "Busca de pacientes realizada com sucesso";
            } else {
                let erro = xhr.status;
                spanMsg.classList = 'mensagem-erro'
                spanMsg.textContent = "Erro ao buscar pacientes, Código do erro:"+ erro;
            }

    });
    xhr.send();
})