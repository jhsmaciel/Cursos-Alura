let titulo = document.querySelector('#titulo');
titulo.textContent = "Aparecida Nutricionista";

for (let i = 1; i <= 5 ; i++) {
    let paciente = document.querySelector('#paciente-'+i);
    getPaciente(paciente);
}

function getPaciente(paciente) {
    h = paciente.querySelector('.info-altura').textContent;
    p = paciente.querySelector('.info-peso').textContent;
    if(p < 0 || p > 500){
        paciente.querySelector('.info-imc').textContent ='Peso inválido';
    } else if (h < 0 || h > 3 ){
        paciente.querySelector('.info-imc').textContent ='Altura inválida';
    } else {
        paciente.querySelector('.info-imc').textContent= p / ( h * h );
    }
}