let titulo = document.querySelector('#titulo');
titulo.textContent = "John Nutricionista";


let paciente = document.querySelectorAll('.paciente')

for (let i = 0; i < paciente.length ; i++) {
    getPaciente(paciente[i]);
}

function getPaciente(paciente) {
    h = paciente.querySelector('.info-altura').textContent;
    p = paciente.querySelector('.info-peso').textContent;
    if( p <= 0 || p > 500 ){
        paciente.querySelector('.info-imc').textContent ='Peso inválido';
        paciente.classList.add('paciente-invalido')
    } else if ( h <= 0 || h > 3 ){
        paciente.querySelector('.info-imc').innerText ='Altura inválida';
        paciente.classList += ' paciente-invalido'
    } else {
        paciente.querySelector('.info-imc').textContent = calcImc(p,h);
    }
}

function calcImc(peso,altura) {
    return (peso / ( altura * altura )).toFixed(2);
}