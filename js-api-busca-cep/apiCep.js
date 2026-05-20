
const loader = document.getElementById('loader');
const inputCep = document.querySelector('#input-cep');
let formulario = document.getElementById('formulario-cep');
let divFormulario = document.getElementById('div-formulario-cep');
let botaoCep = document.querySelector("#buscar-cep");
let mensagemErroCep = document.getElementById('cep-alerta');

botaoCep.addEventListener('click', async () => {
    document.getElementById('formulario-cep').reset();
    let input = document.getElementById('input-cep').value;
    let inputLimpo = validaInput(input);
    divFormulario.setAttribute('hidden', '');
    botaoCep.disabled = true;

    if (inputLimpo.valido) {

        loader.removeAttribute('hidden');
        let dadosCep = await buscarCep(inputLimpo.cep);
        mensagemErroCep.setAttribute('hidden', '');
        loader.setAttribute('hidden', '');

        if (dadosCep.erro) {

            botaoCep.disabled = false;
            mensagemErroCep.removeAttribute('hidden');
            document.getElementById('cep-alerta').innerHTML = dadosCep.mensagem;

        } else {

            botaoCep.disabled = false;
            divFormulario.removeAttribute('hidden');

            for (let chave in dadosCep) {
                if (formulario.elements[chave]) {
                    formulario.elements[chave].value = dadosCep[chave];
                };
            };

        };

    } else {

        loader.setAttribute('hidden', '');
        botaoCep.disabled = false;
        mensagemErroCep.removeAttribute('hidden');
        document.getElementById('cep-alerta').innerHTML = inputLimpo.mensagem;

    };

});

function validaInput(input) {
    const inputValido = new Object();
    let inputLimpo = input.replace(/[^0-9]/g, "");
    let digitoInvalido = input.replace(/[^a-z A-Z]/g, "");
    let digitoIgual = validaRepetido(inputLimpo);

    if (digitoInvalido.length > 0) {
        inputValido.valido = false;
        inputValido.mensagem = `CEP contem ${(digitoInvalido.length === 1) ? "digito" : "digitos"} "${digitoInvalido}" ${(digitoInvalido.length === 1) ? "inválido" : "inválidos"}!`;
    } else if (!digitoIgual) {

        inputValido.valido = false;
        inputValido.mensagem = `CEP ${inputLimpo} é invalido.`;

    } else if (inputLimpo.length < 8) {
        inputValido.valido = false;
        inputValido.mensagem = `CEP faltando digitos.`;

    } else {

        inputValido.cep = inputLimpo;
        inputValido.valido = true;

    };

    return inputValido;

};

function validaRepetido(cep) {

    let cepInput = cep.split('');
    let quantidadeRepetido;
    for (let index = 0; index < cepInput.length; index++) {

        if (parseInt(cepInput[0]) === index) {
            quantidadeRepetido = cepInput.filter(digito => parseInt(digito) === index).length;
        };
    };

    return quantidadeRepetido !== 8;
};

async function buscarCep(cep) {

    try {
        const resposta = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();
        if (dados.erro) {
            dados.mensagem = 'Cep inexistente!';
            return dados;
        } else {
            return dados;
        };

    } catch (erro) {

        let novoErro = new Object();
        novoErro.mensagem = "Erro ao buscar dados, verifique sua conexão";
        novoErro.erro = true;

        return novoErro;

    };
};