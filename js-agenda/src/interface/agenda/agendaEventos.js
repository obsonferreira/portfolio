import { ocultarAtributo, exibirAtributo, exibirMensagem } from "./../compartilhado/notificacoes.js";
import { exibirErrosValidacao, ocultarErrosValidacao } from "./../compartilhado/formulario.js";
import { elementoTabelaAgenda, elementoBotoesAgenda, elementoDialogoAlertasAgenda, elementoBuscaAgenda } from "./elementosAgenda.js";
import { elementoVisorAgenda, elementoAlertaAgenda, elementoDialogoAlteracaoAgenda, elementoFormularioAgenda } from "./elementosAgenda.js";
import { editarFormulario, processaFormulario } from "./agendaFormulario.js";
import { retornaLista } from "../../repositorio/agendaRepositorio.js";
import { criarBotaoEditar, criarCelula, preencheFormulario } from "./agendaTabela.js";
import { alertaBuscaContato } from "../compartilhado/dom.js";
import { buscaContato } from "../../repositorio/agendaRepositorio.js";

export function iniciarAgenda() {
    const lista = retornaLista();
    let referencia;

    document.addEventListener("DOMContentLoaded", () => {
        const corpo = document.createElement("tbody");

        let quantidadeContatos = lista.length;

        elementoVisorAgenda.spanContato.textContent = `${quantidadeContatos > 0 ? "Contatos" : "Contato"} salvo: ${quantidadeContatos}`;

        if (quantidadeContatos === 0) {
            elementoVisorAgenda.spanSemContato.removeAttribute("hidden");
            elementoVisorAgenda.spanSemContato.textContent = "Agenda vazia!";
        } else {
            elementoVisorAgenda.spanSemContato.setAttribute("hidden", "");

            lista.forEach((pessoa) => {
                const valorLinha = document.createElement("tr");
                valorLinha.classList.add(lista.indexOf(pessoa) + 1);

                valorLinha.appendChild(criarCelula(lista.indexOf(pessoa) + 1));
                valorLinha.appendChild(criarCelula(pessoa.nome));
                valorLinha.appendChild(criarCelula(pessoa.sobrenome));

                [pessoa.contato].forEach((contatos) => {
                    valorLinha.appendChild(criarCelula(contatos.telefone));
                    valorLinha.appendChild(criarCelula(contatos.email));
                });

                valorLinha.appendChild(criarBotaoEditar(pessoa.id));
                corpo.appendChild(valorLinha);
            });
            elementoTabelaAgenda.tabela.appendChild(corpo);
        }
    });

    elementoTabelaAgenda.tabela.addEventListener("click", (event) => {
        event.preventDefault();

        const dadosBusca = event.target.getAttribute("data-pessoa");
        referencia = parseInt(dadosBusca);
        preencheFormulario(elementoFormularioAgenda.formulario, dadosBusca);
    });

    elementoFormularioAgenda.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        ocultarErrosValidacao(elementoAlertaAgenda);
        const dados = processaFormulario(elementoFormularioAgenda);
        dados.referencia = referencia;
        exibirErrosValidacao(dados.validacao, elementoAlertaAgenda);
        
        if (dados.validacao.contatoValido) {
            editarFormulario(dados);
        }
    });

    elementoBotoesAgenda.botaoExcluir.addEventListener("click", () => {
        exibirAtributo(elementoAlertaAgenda.mensagemExclusao);
        elementoDialogoAlteracaoAgenda.modalContato.close();
        elementoDialogoAlertasAgenda.modalAlertas.showModal();
    });

    elementoBotoesAgenda.botaoSair.addEventListener("click", () => {
        elementoDialogoAlteracaoAgenda.modalContato.close();
    });

    elementoDialogoAlertasAgenda.botaoSairAlteracao.addEventListener("click", () => {
        elementoDialogoAlertasAgenda.modalAlertas.close();
        location.reload();
    });

    elementoDialogoAlertasAgenda.botaoSim.addEventListener("click", () => {
        deletarContato(referencia);
        location.reload();
    });

    elementoDialogoAlertasAgenda.botaoNao.addEventListener("click", () => {
        elementoDialogoAlteracaoAgenda.modalContato.showModal();
        elementoDialogoAlertasAgenda.modalAlertas.close();
    });

    elementoBuscaAgenda.botaoBusca.addEventListener("click", () => {
        const input = elementoBuscaAgenda.inputBusca.value;
        if (input.length <= 0) {
            const alertaBusca = alertaBuscaContato();
            elementoBuscaAgenda.divBusca.appendChild(alertaBusca);
        } else {
            const resultado = buscaContato(input);
        }
    });
}
