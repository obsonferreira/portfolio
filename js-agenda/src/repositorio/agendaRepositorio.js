// aqui vou salvar contatos, carregar contatos, listar contatos
// atualizar contatos e remover contatos

import { agendaRepositorio } from "../modelos/agenda.js";

agendaRepositorio.contatos = carregarContatos();

export function salvarContato(pessoa, validacao) {

    if (validacao.contatoValido) {

        agendaRepositorio.adicionar(pessoa);
        localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
    };
};

export function editarContato(dados, validacao, parametro) {

    if (validacao.contatoValido) {
        agendaRepositorio.atualizar(dados, parametro);
        localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
    };

};

export function deletarContato(referencia) {
    const contatoExcluir = buscaContato(referencia)
    agendaRepositorio.excluir(contatoExcluir);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
};

export function buscaContato(input) {

    let idContato = retronaId(input);

    return agendaRepositorio.buscar(idContato);
};

export function carregarContatos() {

    const dadosSalvo = localStorage.getItem('contatos');
    let arrayRecuperado;
    if (dadosSalvo == null) {
        arrayRecuperado = [];
    } else {

        arrayRecuperado = JSON.parse(dadosSalvo);
    };

    return arrayRecuperado;
};

export function retornaLista() {

    return agendaRepositorio.listar();
};

export function listaId(input) {

    const lista = agendaRepositorio.listar();
    return {
        nome: lista.find(usuario => usuario.nome === input.nome).id,
        sobrenome: lista.find(usuario => usuario.sobrenome === input.sobrenome).id,
        telefone: lista.find(usuario => usuario.contato.telefone === input.telefone).id,
        email: lista.find(usuario => usuario.contato.email === input.email).id
    };

};

function retronaId(input) {
    const id = new Set(Object.values(listaId(input)));
    const idConvertido = id.values();

    return idConvertido.next().value;
};