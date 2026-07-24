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
        nome: lista.find(usuario => usuario.nome === input.nome),
        sobrenome: lista.find(usuario => usuario.sobrenome === input.sobrenome),
        telefone: lista.find(usuario => usuario.contato.telefone === input.contato.telefone),
        email: lista.find(usuario => usuario.contato.email === input.contato.email)
    };
};

function retronaId(input) {
    const dadosId = listaId(input);
    const conversao = {
        nome: dadosId.nome.id,
        sobrenome: dadosId.sobrenome.id,
        telefone: dadosId.telefone.id,
        email: dadosId.email.id
    };

    const id = new Set(Object.values(conversao));
    const idConvertido = id.values();

    return idConvertido.next().value;
};