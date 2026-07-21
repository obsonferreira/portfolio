import { buscaContato } from "../../repositorio/agendaRepositorio.js";
import { elementoDialogoAlteracaoAgenda } from "./elementosAgenda.js";

export function preencheFormulario(formulario, dadosBusca) {
    const dados = buscaContato(dadosBusca);
    for (const chave in dados) {
        if (formulario.elements[chave]) {
            formulario.elements[chave].value = dados[chave];
        }
        if (chave === "contato") {
            for (const contato in dados.contato) {
                if (formulario.elements[contato]) {
                    formulario.elements[contato].value = dados.contato[contato];
                }
            }
        }
    }

    elementoDialogoAlteracaoAgenda.modalContato.showModal();
}

export function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

export function criarBotaoEditar(pessoa) {
    const td = document.createElement('td');
    const botao = document.createElement("button");
    botao.classList.add("btn-editar");
    botao.textContent = "Editar";
    botao.dataset.pessoa = pessoa;
    td.appendChild(botao);
    return td;
}
