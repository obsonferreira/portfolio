import { ocultarAtributo, exibirAtributo, exibirMensagem  } from './../compartilhado/notificacoes.js';
import { exibirErrosValidacao, ocultarErrosValidacao, processaFormulario } from './../compartilhado/formulario.js';
import { elementoAlertaAgenda, elementoDialogoAlteracaoAgenda, elementoFormularioAgenda } from './elementosAgenda.js';
import { editarFormulario } from './agendaFormulario.js';
import { retornaLista } from '../../repositorio/agendaRepositorio.js';

const lista = retornaLista();
let referencia;

document.addEventListener('DOMContentLoaded', () => {
    const corpo = document.createElement('tbody');

    let quantidadeContatos = lista.length

    spanContato.innerHTML = `${quantidadeContatos > 0 ? 'Contatos' : 'Contato'} salvo: ${quantidadeContatos}`

    if (quantidadeContatos === 0) {

        spanSemContato.removeAttribute('hidden');
        spanSemContato.innerHTML = "Agenda vazia!";

    } else {

        spanSemContato.setAttribute('hidden', "");

        lista.forEach(pessoa => {
            const valorLinha = document.createElement('tr');
            valorLinha.classList.add(lista.indexOf(pessoa) + 1);

            const tdIndex = document.createElement('td');
            tdIndex.textContent = lista.indexOf(pessoa) + 1;
            valorLinha.appendChild(tdIndex);

            const tdNome = document.createElement('td');
            tdNome.textContent = pessoa.nome;
            valorLinha.appendChild(tdNome);

            const tdSobrenome = document.createElement('td');
            tdSobrenome.textContent = pessoa.sobrenome;
            valorLinha.appendChild(tdSobrenome);

            [pessoa.contato].forEach(contatos => {

                const tdTelefone = document.createElement('td');
                tdTelefone.textContent = contatos.telefone;
                valorLinha.appendChild(tdTelefone);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = contatos.email;
                valorLinha.appendChild(tdEmail);

            });

            const tdEditar = document.createElement('button');
            tdEditar.classList.add('btn-editar');
            tdEditar.textContent = 'Editar';
            tdEditar.dataset.pessoa = pessoa.id;

            valorLinha.appendChild(tdEditar);
            corpo.appendChild(valorLinha);
        });
        tabela.appendChild(corpo);


    };
});

tabela.addEventListener('click', (event) => {
    event.preventDefault();

    const dadosBusca = event.target.getAttribute('data-pessoa');
    const dados = buscaContato(dadosBusca);
    referencia = parseInt(dadosBusca);
    for (const chave in dados) {

        if (formulario.elements[chave]) {

            formulario.elements[chave].value = dados[chave];

        };
        if (chave === "contato") {

            for (const contato in dados.contato) {

                if (formulario.elements[contato]) {
                    formulario.elements[contato].value = dados.contato[contato];
                };
            };
        };
    };

    modalContato.showModal();
});

formulario.addEventListener('submit', (event) => {

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
