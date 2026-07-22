import { salvarContato } from "../../repositorio/agendaRepositorio.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";
import { criarPessoa } from "../../servicos/agendaService.js";
import { validaPessoa, verificaDuplicidade } from "../../validadores/validaPessoa.js";
import { validaEntrada } from "../../validadores/validaCampo.js";
import { validacaoGeral } from './../../validadores/compartilhado.js';

export function processaFormulario(elemento) {
    const formData = new FormData(elemento.formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    return criarPessoa(dadosObjeto);
};

export function enviarFormulario(dados) {

    salvarContato(dados.pessoa, dados.validacao);
    modalContatoSalvo();
};

export function validaFormulario(pessoa) {
    const validacao = validaPessoa(pessoa);
    // const contatoExistente = verificaDuplicidade(pessoa);
    const dados = {
        pessoa: pessoa,
        validacao: validacao
    };

    return dados;
};

export function validaCamposObrigatorio(dadosFormulario) {

    const resultado = {
        nome: validaEntrada(dadosFormulario['nome']),
        telefone: validaEntrada(dadosFormulario['telefone']),
        email: validaEntrada(dadosFormulario['email'])
    }; 
    const validacao = validacaoGeral(resultado);
    resultado.valido = validacao;
    
    return resultado ;
    
};
