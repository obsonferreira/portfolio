import { elementoAlerta, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { processaFormulario, exibirErrosValidacao, ocultarErrosValidacao } from "../compartilhado/formulario.js";
import {enviarFormulario} from "./cadastroFormulario.js";

export function iniciarCadastro() {

    elementoCadastro.formulario.addEventListener('submit', (event) => {

        event.preventDefault();
        ocultarErrosValidacao(elementoAlerta);
        const dados = processaFormulario(elementoCadastro);
        exibirErrosValidacao(dados.validacao);
        if (dados.validacao.contatoValido) {

            enviarFormulario(dados);
            elementoCadastro.formulario.reset();
        };
    });

    elementoDialogo.botaoFechar.addEventListener('click', () => {

        elementoDialogo.modalCadastro.close();
    });
};
