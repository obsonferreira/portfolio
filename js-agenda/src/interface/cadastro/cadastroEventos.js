import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { validaFormulario, bloquearBotao, desbloquearBotao, validaCamposObrigatorio, processaFormulario, exibirErrosCampos, exibirErrosValidacao, validaDuplicidadeFormulario } from "../compartilhado/formulario.js";
import { enviarFormulario } from "./cadastroFormulario.js";

let camposValidos = false ;
function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const dadosFormulario = processaFormulario(elementoCadastro);
        const resultadoValidacao = validaFormulario(dadosFormulario);
        const resultadoDuplicidade = validaDuplicidadeFormulario(dadosFormulario);
        camposValidos = !resultadoValidacao.contatoValido || !resultadoDuplicidade.contatoValido;
        console.log(!resultadoValidacao.contatoValido || !resultadoDuplicidade.contatoValido);
        
        if (!resultadoValidacao.contatoValido) {
            exibirErrosValidacao(resultadoValidacao, elementoAlerta);
        } else if (!resultadoDuplicidade.contatoValido) {
            exibirErrosValidacao(resultadoDuplicidade, elementoAlerta);
        };

        if (resultadoValidacao.contatoValido && resultadoDuplicidade.contatoValido) {
            enviarFormulario(resultadoValidacao);
            elementoCadastro.formulario.reset();
        };

    });
};
function sairMensagem() {
    elementoDialogo.botaoFechar.addEventListener("click", () => {
        elementoDialogo.modalCadastro.close();
    });
};

function validaCamposFormulario() {

    bloquearBotao(elementoBotoes);
    elementoCadastro.formulario.addEventListener('input', () => {
        const resultado = validaCamposObrigatorio(elementoCadastro.formulario);
        desbloquearBotao(resultado.valido, elementoBotoes);
        console.log(camposValidos);
        console.log(resultado);
        
        if (!resultado.valido || !camposValidos) {
            
            exibirErrosValidacao(resultado, elementoAlerta);
        };
    });
};

export function main() {
    iniciarCadastro();
    validaCamposFormulario();
    sairMensagem();
}

