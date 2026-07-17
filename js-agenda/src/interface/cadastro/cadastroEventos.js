import { elementoAlerta, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { exibirErrosValidacao, ocultarErrosValidacao } from "../compartilhado/formulario.js";
import { processaFormulario, enviarFormulario } from "./cadastroFormulario.js";

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
}
