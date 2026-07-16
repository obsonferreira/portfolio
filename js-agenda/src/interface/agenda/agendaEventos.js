import {
    ocultarAtributo,
    exibirAtributo,
    exibirMensagem
} from './../compartilhado/notificacoes.js';
import {
    exibirErrosValidacao,
    ocultarErrosValidacao,
    processaFormulario
} from './../compartilhado/formulario.js';
import {
    elementoVisorAgenda,
    elementoAlertaAgenda,
    elementoDialogoAlteracaoAgenda,
    elementoFormularioAgenda,
    elementoTabelaAgenda
} from './elementosAgenda.js';
import {
    editarFormulario
} from './agendaFormulario.js';
import {
    retornaLista
} from '../../repositorio/agendaRepositorio.js';
import {
    criarBotaoEditar,
    criarCelula,
    preencheFormulario
} from './agendaTabela.js';

export function iniciarAgenda() {

    const lista = retornaLista();
    let referencia;

    document.addEventListener('DOMContentLoaded', () => {
        const corpo = document.createElement('tbody');

        let quantidadeContatos = lista.length

        elementoVisorAgenda.spanContato.innerHTML = `${quantidadeContatos > 0 ? 'Contatos' : 'Contato'} salvo: ${quantidadeContatos}`

        if (quantidadeContatos === 0) {

            elementoVisorAgenda.spanSemContato.removeAttribute('hidden');
            elementoVisorAgenda.spanSemContato.innerHTML = "Agenda vazia!";

        } else {

            elementoVisorAgenda.spanSemContato.setAttribute('hidden', "");

            lista.forEach(pessoa => {
                const valorLinha = document.createElement('tr');
                valorLinha.classList.add(lista.indexOf(pessoa) + 1);

                valorLinha.appendChild(criarCelula(lista.indexOf(pessoa) + 1));
                valorLinha.appendChild(criarCelula(pessoa.nome));
                valorLinha.appendChild(criarCelula(pessoa.sobrenome));

                [pessoa.contato].forEach(contatos => {

                    valorLinha.appendChild(criarCelula(contatos.telefone));
                    valorLinha.appendChild(criarCelula(contatos.email));

                });

                valorLinha.appendChild(criarBotaoEditar(pessoa.id));
                corpo.appendChild(valorLinha);
            });
            elementoTabelaAgenda.tabela.appendChild(corpo);

        };
    });

    elementoTabelaAgenda.tabela.addEventListener('click', (event) => {
        event.preventDefault();

        const dadosBusca = event.target.getAttribute('data-pessoa');
        referencia = parseInt(dadosBusca);
        preencheFormulario(elementoFormularioAgenda.formulario, dadosBusca);
    });

    elementoFormularioAgenda.formulario.addEventListener('submit', (event) => {

        event.preventDefault();
        ocultarErrosValidacao(elementoAlertaAgenda);
        const dados = processaFormulario(elementoFormularioAgenda.formulario);
        dados.referencia = referencia;
        exibirErrosValidacao(dados.validacao);
        if (dados.validacao.contatoValido) {
            editarFormulario(dados);
        };

    });

    botaoExcluir.addEventListener('click', () => {

        mensagemExclusao.removeAttribute('hidden');
        modalContato.close();
        modalAlertas.showModal();
    });

    botaoSair.addEventListener('click', () => {

        modalContato.close();

    });

    botaoSairAlteracao.addEventListener('click', () => {

        modalAlertas.close();
        location.reload();
    });

    botaoSim.addEventListener('click', () => {

        deletarContato(referencia);
        location.reload();
    });

    botaoNao.addEventListener('click', () => {

        modalContato.showModal();
        modalAlertas.close();
    });

    botaoBusca.addEventListener('click', () => {
        const input = inputBusca.value;
        if (input.length <= 0) {

            const spanBusca = document.createElement('span');
            spanBusca.innerHTML = 'Campo não pode ser vázio!';
            divBusca.appendChild(spanBusca);
        } else {

            const resultado = buscaContato(input);
        };
    });
};