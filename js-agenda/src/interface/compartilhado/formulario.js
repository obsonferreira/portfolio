import { exibirMensagem, ocultarAtributo, exibirAtributo } from "../compartilhado/notificacoes.js";

export function exibirErrosValidacao(validacao, elementoAlerta) {

    if (validacao.nome.erro) {
        exibirAtributo(elementoAlerta.nome);
        exibirMensagem(elementoAlerta.nome, validacao.nome.mensagem);
    };

    if (validacao.sobrenome.erro) {
        exibirAtributo(elementoAlerta.sobrenome);
        exibirMensagem(elementoAlerta.sobrenome, validacao.sobrenome.mensagem);
    };

    if (validacao.telefone.erro) {
        exibirAtributo(elementoAlerta.telefone);
        exibirMensagem(elementoAlerta.telefone, validacao.telefone.mensagem);
    };

    if (validacao.email.erro) {
        exibirAtributo(elementoAlerta.email);
        exibirMensagem(elementoAlerta.email, validacao.email.mensagem);
    };

    // if (!contatoExistente.contatoValido) {
    //     modal.showModal();
    //     if (contatoExistente.email.erro) {
    //         alertaEmailExistente.innerHTML = contatoExistente.email.mensagem;

    //     };
    //     if (contatoExistente.telefone.erro) {
    //         alertaTelefoneExistente.innerHTML = contatoExistente.telefone.mensagem;
    //     };
    // };
};

export function ocultarErrosValidacao(elemento) {
    ocultarAtributo(elemento.nome);
    ocultarAtributo(elemento.sobrenome);
    ocultarAtributo(elemento.telefone);
    ocultarAtributo(elemento.email);
};

export function exibirErrosCampos(dados, elementoAlerta) {
    if (dados.erro) {
        exibirAtributo(elementoAlerta[dados.campo]);
        exibirMensagem(elementoAlerta[dados.campo], dados.mensagem);
    };

};

export function bloquearBotao(validacao,elemento) {
    if (validacao.erro) {
        elemento.botaoSubmit.disabled = true;
    } else {
        elemento.botaoSubmit.disabled= false;
    }
}