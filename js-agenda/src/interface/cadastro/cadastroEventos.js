import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { validaFormulario, bloquearBotao, desbloquearBotao, validaCamposObrigatorio, processaFormulario, exibirErrosCampos, exibirErrosValidacao, validaDuplicidadeFormulario } from "../compartilhado/formulario.js";
import { enviarFormulario } from "./cadastroFormulario.js";
import { Pessoa } from "../../modelos/pessoa.js";

let formularioValido = false;
function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const pessoa = processaFormulario(elementoCadastro);
        const dadosFormulario = {
            pessoa:pessoa,
            validacao: validaFormulario(pessoa),
            duplicidade: validaDuplicidadeFormulario(pessoa)
        };
        formularioValido = !dadosFormulario.validacao.contatoValido || !dadosFormulario.duplicidade.contatoValido;

        if (!dadosFormulario.validacao.contatoValido) {
            exibirErrosValidacao(dadosFormulario.validacao, elementoAlerta);
        } else if (!dadosFormulario.duplicidade.contatoValido) {
            exibirErrosValidacao(dadosFormulario.duplicidade, elementoAlerta);
        };

        if (dadosFormulario.validacao.contatoValido && dadosFormulario.duplicidade.contatoValido) {
            enviarFormulario(dadosFormulario);
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

        if (!resultado.valido || !formularioValido) {

            exibirErrosValidacao(resultado, elementoAlerta);
        };
    });
};

export function main() {
    iniciarCadastro();
    validaCamposFormulario();
    sairMensagem();
}

