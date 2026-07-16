import { buscaContato, retornaLista, editarContato, deletarContato } from "../repositorio/agendaRepositorio.js";
import { criarPessoa } from "../servicos/agendaService.js";
import { validaPessoa, verificaDuplicidade } from "../validadores/validaPessoa.js";

const spanContato = document.getElementById('quantidade-contatos');
const spanSemContato = document.getElementById('sem-contato');
const divBusca = document.getElementById('busca-contato');
const inputBusca = document.getElementById('input-busca');

const modalContato = document.getElementById('modal-contato');
const modalAlertas = document.getElementById('modal-alertas');
const formulario = document.getElementById('formulario-modal');

const alertaNome = document.getElementById('alerta-nome');
const alertaSobrenome = document.getElementById('alerta-sobrenome');
const alertaTelefone = document.getElementById('alerta-telefone');
const alertaEmail = document.getElementById('alerta-email');

const botaoBusca = document.getElementById('botao-busca');
const botaoEditarForm = document.getElementById('editar-form');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSair = document.getElementById('btn-sair');
const botaoSairAlteracao = document.getElementById('btn-sair-alteracao');
const botaoSairDuplicida = document.getElementById('btn-sair-duplicidade');
const botaoSim = document.getElementById('btn-sim');
const botaoNao = document.getElementById('btn-nao');

const mensagemExclusao = document.getElementById('container-exclusao');
const mensagemAlteracao = document.getElementById('container-alteracao');
// const mensagemDuplicidade = document.getElementById('container-duplicidade');

const lista = retornaLista();
const tabela = document.getElementById('tabela-contato');
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

    alertaNome.setAttribute('hidden', "");
    alertaSobrenome.setAttribute('hidden', "");
    alertaTelefone.setAttribute('hidden', "");
    alertaEmail.setAttribute('hidden', "");

    const formData = new FormData(formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    const pessoa = criarPessoa(dadosObjeto);
    // pessoa.id = referencia;
    const validacao = validaPessoa(pessoa);
    const contatoExistente = verificaDuplicidade(pessoa);
    // const emailSelecionado = contatoExistente.idEmail === referencia;
    // const telefoneSelecionado = contatoExistente.idTelefone === referencia;
    // const contatoSemAlteracao = emailSelecionado && telefoneSelecionado;

    // console.log(contatoExistente);
    // console.log(emailSelecionado);
    // console.log(telefoneSelecionado);
    // console.log(contatoSemAlteracao);
    // console.log();

    //verificar a validação da duplicidade


    if (validacao.nome.erro) {
        alertaNome.removeAttribute('hidden');
        alertaNome.innerHTML = validacao.nome.mensagem;
    };

    if (validacao.sobrenome.erro) {
        alertaSobrenome.removeAttribute('hidden');
        alertaSobrenome.innerHTML = validacao.sobrenome.mensagem;
    };

    if (validacao.telefone.erro) {
        alertaTelefone.removeAttribute('hidden');
        alertaTelefone.innerHTML = validacao.telefone.mensagem;
    };

    if (validacao.email.erro) {

        alertaEmail.removeAttribute('hidden');
        alertaEmail.innerHTML = validacao.email.mensagem;
    };

    if (validacao.contatoValido) { //|| contatoExistente.contatoValido
        console.log("validacao.contatoValido");

        editarContato(pessoa, validacao, referencia);
        modalContato.close();
        mensagemAlteracao.removeAttribute('hidden');
        modalAlertas.showModal();
    };
    // if (contatoSemAlteracao) {

    // } else {
    //     console.log("else (validacao.contatoValido)");
    // if (contatoExistente.email.erro && !emailSelecionado) {
    //     alertaEmail.removeAttribute('hidden');
    //     alertaEmail.innerHTML = contatoExistente.email.mensagem;

    // };

    // if (contatoExistente.telefone.erro && !telefoneSelecionado) {
    //     alertaTelefone.removeAttribute('hidden');
    //     alertaTelefone.innerHTML = contatoExistente.telefone.mensagem;

    // };

    // };

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
