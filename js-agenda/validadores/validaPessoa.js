import { buscaContato } from "../repositorio/agendaRepositorio.js";

function validaContato(validacao) {
    let contaErros = 0;
    let dados = Object.values(validacao);

    for (let index = 0; index < dados.length; index++) {

        if (dados[index].erro) {
            contaErros++;
        };
    };

    if (contaErros > 0) {
        return false;
    } else {
        return true;
    };
};

export function validaPessoa(pessoa) {
    const validacao = {};
    validacao.nome = pessoa.validarNome();
    validacao.telefone = pessoa.contato.validarTelefone();
    validacao.email = pessoa.contato.validarEmail();

    if (pessoa.sobrenome.length > 0) {

        validacao.sobrenome = pessoa.validarSobrenome();

    } else {

        validacao.sobrenome = { sobrenome: "", erro: false }

    };
    validacao.contatoValido = validaContato(validacao)

    return validacao;

};

export function verificaDuplicidade(pessoa) {
    const resultado = {};
    const resultadoTelefone = buscaContato(pessoa.contato.telefone);
    const resultadoEmail = buscaContato(pessoa.contato.email);

    if (!resultadoTelefone.erro) {
        const verificaTelefone = resultadoTelefone.contato.telefone === pessoa.contato.telefone;
        if (verificaTelefone) {

            resultado.telefone = { erro: true, mensagem: `Telefone pertece ao contato: ${resultadoTelefone.nome}  ${resultadoTelefone.sobrenome}` };
        };
    } else {
        resultado.telefone = { erro: false };
    };

    if (!resultadoEmail.erro) {
        const verificaEmail = resultadoEmail.contato.email === pessoa.contato.email;
        if (verificaEmail) {

            resultado.email = { erro: true, mensagem: `Email pertece ao contato: ${resultadoEmail.nome} ${resultadoEmail.sobrenome}` };
        };
    } else {
        resultado.email = { erro: false };
    };
    resultado.contatoValido = validaContato(resultado);

    return resultado;
};


