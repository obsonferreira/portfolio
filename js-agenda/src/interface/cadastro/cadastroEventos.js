import { elementoCadastro } from "./elementosCadastro.js";
import { processaFormulario, exibirErrosValidacao, enviarFormulario, ocultarErrosValidacao } from "./cadastroFormulario.js";


export function iniciarProcessamento() {

    elementoCadastro.formulario.addEventListener('submit', (event) => {

        event.preventDefault();
        ocultarErrosValidacao();
        const dados = processaFormulario();
        exibirErrosValidacao(dados.validacao);
        if (dados.validacao.contatoValido) {

            enviarFormulario(dados);
            elementoCadastro.formulario.reset();
        };

    });
};
