import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { validaFormulario, bloquearBotao, desbloquearBotao, validaCamposObrigatorio, processaFormulario, exibirErrosCampos, exibirErrosValidacao, ocultarErrosValidacao } from "../compartilhado/formulario.js";
import { enviarFormulario } from "./cadastroFormulario.js";

let camposValidos = true;

function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        // ocultarErrosValidacao(elementoAlerta);
        const dadosFormulario = processaFormulario(elementoCadastro);
        const resultado = validaFormulario(dadosFormulario);
        camposValidos = resultado.validacao.contatoValido;

        exibirErrosValidacao(resultado.validacao, elementoAlerta);
        
        if (resultado.validacao.contatoValido) {
            enviarFormulario(resultado);
            elementoCadastro.formulario.reset();
        }
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
        if (camposValidos) {
            exibirErrosCampos(resultado.nome, elementoAlerta);
            exibirErrosCampos(resultado.telefone, elementoAlerta);
            exibirErrosCampos(resultado.email, elementoAlerta);
        };
    });
};

export function main() {
    iniciarCadastro();
    validaCamposFormulario();
    sairMensagem();
}

