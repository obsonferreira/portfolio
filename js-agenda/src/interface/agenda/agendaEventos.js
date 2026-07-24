import { ocultarAtributo, exibirAtributo, exibirMensagem } from "./../compartilhado/notificacoes.js";
import { exibirErrosCampos, exibirErrosValidacao, ocultarErrosValidacao, processaFormulario, validaFormulario } from "./../compartilhado/formulario.js";
import { bloquearBotao, desbloquearBotao, validaCamposObrigatorio } from "./../compartilhado/formulario.js";
import { elementoTabelaAgenda, elementoDialogoAlertasAgenda, elementoBuscaAgenda } from "./elementosAgenda.js";
import { elementoVisorAgenda, elementoAlertaAgenda, elementoDialogoEdicao, elementoFormularioAgenda } from "./elementosAgenda.js";
import { editarFormulario } from "./agendaFormulario.js";
import { deletarContato, retornaLista } from "../../repositorio/agendaRepositorio.js";
import { preencheFormulario, criarTabelaContato, retornaDadosTabela } from "./agendaTabela.js";
import { alertaBuscaContato } from "../compartilhado/dom.js";
import { buscaContato } from "../../repositorio/agendaRepositorio.js";

let referencia;
let camposValidos = true;

function iniciarAgenda() {
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
        };
    });

};

function iniciarEdicao() {
    elementoFormularioAgenda.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        ocultarErrosValidacao(elementoAlertaAgenda);
        const dadosFormulario = processaFormulario(elementoFormularioAgenda);
        const resultado = validaFormulario(dadosFormulario);
        camposValidos = resultado.validacao.contatoValido;
        exibirErrosValidacao(resultado.validacao, elementoAlertaAgenda);
        resultado.referencia = referencia;

        if (resultado.validacao.contatoValido) {
            editarFormulario(resultado);
        };

    });
};

function editarContatoAgenda() {
    elementoTabelaAgenda.tabela.addEventListener("click", (event) => {
        event.preventDefault();
        const click = event.target;

        if (click.tagName === 'BUTTON') {
            // const dadosBusca = click.getAttribute("data-pessoa");
            const linhaTabela = click.closest('tr');
            const dados = retornaDadosTabela(linhaTabela)
            // referencia = parseInt(dadosBusca);
            preencheFormulario(elementoFormularioAgenda.formulario, dados);
        };

    });
};

function validaCamposFormulario() {

    elementoFormularioAgenda.formulario.addEventListener('input', () => {
        ocultarErrosValidacao(elementoAlertaAgenda);
        const resultado = validaCamposObrigatorio(elementoFormularioAgenda.formulario);

        desbloquearBotao(resultado.valido, elementoFormularioAgenda);
        if (camposValidos) {
            exibirErrosCampos(resultado.nome, elementoAlertaAgenda);
            exibirErrosCampos(resultado.telefone, elementoAlertaAgenda);
            exibirErrosCampos(resultado.email, elementoAlertaAgenda);
        };
    });
};

function sairEdicaoFeita() {
    elementoDialogoAlertasAgenda.botaoSairAlteracao.addEventListener("click", () => {
        elementoDialogoAlertasAgenda.modalAlertas.close();
        location.reload();
    });
};

function cancelarAlteracao() {
    elementoDialogoEdicao.botaoSair.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.close();
    });
};

function excluirContatoAgenda() {

    elementoDialogoEdicao.botaoExcluir.addEventListener("click", () => {
        exibirAtributo(elementoDialogoAlertasAgenda.mensagemExclusao);
        elementoDialogoEdicao.modalEdicao.close();
        elementoDialogoAlertasAgenda.modalAlertas.showModal();
    });
};

function confirmarExclusao() {
    elementoDialogoAlertasAgenda.botaoSim.addEventListener("click", () => {
        deletarContato(referencia);
        location.reload();
    });
};

function cancelarExclusao() {
    elementoDialogoAlertasAgenda.botaoNao.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.showModal();
        elementoDialogoAlertasAgenda.modalAlertas.close();
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
    iniciarEdicao();
    editarContatoAgenda();
    validaCamposFormulario();
    cancelarAlteracao();
    sairEdicaoFeita()

    excluirContatoAgenda();
    confirmarExclusao();
    cancelarExclusao();

    buscarContato();
};