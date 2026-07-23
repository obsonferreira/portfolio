import { ocultarAtributo, exibirAtributo, exibirMensagem } from "./../compartilhado/notificacoes.js";
import { exibirErrosValidacao, ocultarErrosValidacao, processaFormulario } from "./../compartilhado/formulario.js";
import { elementoTabelaAgenda, elementoDialogoAlertasAgenda, elementoBuscaAgenda } from "./elementosAgenda.js";
import { elementoVisorAgenda, elementoAlertaAgenda, elementoDialogoEdicao, elementoFormularioAgenda } from "./elementosAgenda.js";
import { editarFormulario } from "./agendaFormulario.js";
import { retornaLista } from "../../repositorio/agendaRepositorio.js";
import { preencheFormulario, criarTabelaContato } from "./agendaTabela.js";
import { alertaBuscaContato } from "../compartilhado/dom.js";
import { buscaContato } from "../../repositorio/agendaRepositorio.js";

let referencia;
export function iniciarAgenda() {
    const lista = retornaLista();

    document.addEventListener("DOMContentLoaded", () => {
        let quantidadeContatos = lista.length;

        elementoVisorAgenda.contador.textContent = `${quantidadeContatos > 0 ? "Contatos" : "Contato"} salvo: ${quantidadeContatos}`;

        if (quantidadeContatos === 0) {
            exibirAtributo(elementoAlertaAgenda.contato);
            exibirMensagem(elementoAlertaAgenda.contato, "Agenda vazia!");
        } else {
            ocultarAtributo(elementoAlertaAgenda.contato);
            const tabela = criarTabelaContato(lista);
            elementoTabelaAgenda.tabela.appendChild(tabela);
        }
    });

};

export function editarContatoAgenda() {
    elementoTabelaAgenda.tabela.addEventListener("click", (event) => {
        event.preventDefault();
        const click = event.target.tagName;
        if (click === 'BUTTON') {
            const dadosBusca = event.target.getAttribute("data-pessoa");
            referencia = parseInt(dadosBusca);
            preencheFormulario(elementoFormularioAgenda.formulario, dadosBusca);
        }

    });
};

function excluirContatoAgenda() {

    elementoDialogoEdicao.botaoExcluir.addEventListener("click", () => {
        exibirAtributo(elementoAlertaAgenda.mensagemExclusao);
        elementoDialogoEdicao.modalEdicao.close();
        elementoDialogoAlertasAgenda.modalAlertas.showModal();
    });
};

function sairEdicao() {
    elementoDialogoEdicao.botaoSair.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.close();
    });
};

function cancelarAlteracao() {
    elementoDialogoAlertasAgenda.botaoSairAlteracao.addEventListener("click", () => {
        elementoDialogoAlertasAgenda.modalAlertas.close();
        location.reload();
    });
};

function confirmar() {
    elementoDialogoAlertasAgenda.botaoSim.addEventListener("click", () => {
        deletarContato(referencia);
        location.reload();
    });
};

function cancelar() {
    elementoDialogoAlertasAgenda.botaoNao.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.showModal();
        elementoDialogoAlertasAgenda.modalAlertas.close();
    });
};

function iniciarEdicao() {
    elementoFormularioAgenda.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        ocultarErrosValidacao(elementoAlertaAgenda);
        const dadosFormulario = processaFormulario(elementoCadastro);
        const resultado = validaFormulario(dadosFormulario);
        camposValidos = resultado.validacao.contatoValido;
        exibirErrosValidacao(resultado.validacao, elementoAlertaAgenda);
        enviarFormulario(resultado);

        // dados.referencia = referencia;

        if (resultado.validacao.contatoValido) {
            editarFormulario(resultado);
        };

    });
};

function buscarContato() {
    elementoBuscaAgenda.botaoBusca.addEventListener("click", () => {
        const input = elementoBuscaAgenda.inputBusca.value;
        if (input.length <= 0) {
            const alertaBusca = alertaBuscaContato();
            elementoBuscaAgenda.divBusca.appendChild(alertaBusca);
        } else {
            const resultado = buscaContato(input);
        };
    });
};

export function mainAgenda() {
    iniciarAgenda();
    editarContatoAgenda();
    excluirContatoAgenda();
    cancelarAlteracao();
    confirmar();
    cancelar();
    iniciarEdicao();
    buscarContato();
};