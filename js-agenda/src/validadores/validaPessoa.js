import { retornaLista } from "../repositorio/agendaRepositorio.js";
import { validacaoGeral } from "./compartilhado.js";
import { validaDuplicidade } from "./validaDuplicidade.js";

export function validaPessoa(pessoa) {
    const validacao = {};
    validacao.nome = pessoa.validarNome();
    validacao.sobrenome = pessoa.validarSobrenome();
    validacao.telefone = pessoa.contato.validarTelefone();
    validacao.email = pessoa.contato.validarEmail();
   
    if (pessoa.sobrenome.length <= 0) {

        validacao.sobrenome.erro = false;
        validacao.sobrenome.mensagem = '';
    };

    validacao.contatoValido = validacaoGeral(validacao);    

    return validacao;
};

export function verificaDuplicidade(pessoa) {

    const lista = retornaLista();
    return validaDuplicidade(pessoa, lista);
};


