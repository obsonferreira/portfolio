import { exibirMensagem, ocultarAtributo, exibirAtributo } from "../compartilhado/notificacoes.js";
import { criarPessoa } from "../../servicos/agendaService.js";
import { validaPessoa, verificaDuplicidade } from "../../validadores/validaPessoa.js";
import { validaEntrada } from "../../validadores/validaCampo.js";
import { validacaoGeral } from './../../validadores/compartilhado.js';
import { elementoAlerta } from "../cadastro/elementosCadastro.js";

export function exibirErrosValidacao(validacao, elementoAlerta) {
    console.log(validacao);
    
    for (const chave in validacao) {
        
        if (chave !== "valido" || chave !== "contatoValido") {
            
            console.log(chave);
            console.log(validacao[chave]);
            if (validacao[chave]) {
                exibirErrosCampos(validacao[chave], elementoAlerta);
            };
        };

    };
};

export function exibirErrosCampos(dados, elementoAlerta) {
    if (dados.erro) {
        exibirAtributo(elementoAlerta[dados.campo]);
        exibirMensagem(elementoAlerta[dados.campo], dados.mensagem);
    }else{
        ocultarAtributo(elementoAlerta[dados.campo]);
    };

};

export function desbloquearBotao(validacao, elemento) {

    if (validacao) {
        elemento.submit.disabled = false;
    } else {
        elemento.submit.disabled = true;
    };
};

export function bloquearBotao(elemento) {

    elemento.submit.disabled = true;
};

export function processaFormulario(elemento) {

    const formData = new FormData(elemento.formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    return criarPessoa(dadosObjeto);
};

export function validaFormulario(pessoa) {

    return validaPessoa(pessoa);
};

export function validaDuplicidadeFormulario(pessoa) {

    return verificaDuplicidade(pessoa);
};

export function validaCamposObrigatorio(dadosFormulario) {

    const resultado = {
        nome: validaEntrada(dadosFormulario['nome']),
        telefone: validaEntrada(dadosFormulario['telefone']),
        email: validaEntrada(dadosFormulario['email'])
    };
    const validacao = validacaoGeral(resultado);
    resultado.valido = validacao;

    return resultado;
};