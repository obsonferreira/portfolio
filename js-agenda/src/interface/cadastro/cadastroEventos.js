import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { bloquearBotao, exibirErrosCampos, exibirErrosValidacao, ocultarErrosValidacao } from "../compartilhado/formulario.js";
import { processaFormulario, enviarFormulario } from "./cadastroFormulario.js";
import { validaEntrada } from './../../validadores/validaCampo.js';

export function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        ocultarErrosValidacao(elementoAlerta);
        const dados = processaFormulario(elementoCadastro);
        exibirErrosValidacao(dados.validacao, elementoAlerta);
        if (dados.validacao.contatoValido) {
            enviarFormulario(dados);
            elementoCadastro.formulario.reset();
        }
    });

    elementoDialogo.botaoFechar.addEventListener("click", () => {
        elementoDialogo.modalCadastro.close();
    });
};


export function validaInputsForm() {
    elementoCadastro.formulario.addEventListener('mouseover', (evento) => {
        const campo = evento.target;
        ocultarErrosValidacao(elementoAlerta);
        const validacao = validaEntrada(campo);
        exibirErrosCampos(validacao,elementoAlerta);
        bloquearBotao(validacao,elementoBotoes);
        


    });
};
