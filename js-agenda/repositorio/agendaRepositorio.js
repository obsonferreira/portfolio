// aqui vou salvar contatos, carregar contatos, listar contatos
// atualizar contatos e remover contatos

import { agendaRepositorio } from "../modelos/agenda.js";
import { retronaId } from "./ferramentas.js";

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

    let idContato = retronaId(input, retornaLista());
    
    if (idContato.erro) {
        return { erro: idContato.erro };
    };

    let dadoBusca = agendaRepositorio.buscar(idContato);
    return dadoBusca;

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