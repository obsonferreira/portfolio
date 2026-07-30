import { validacaoGeral } from "./compartilhado.js";

export function validaDuplicidade(input, lista) {
    
    const resultado = {};
    const dadosBusca = {
        telefone: lista.some(usuario => usuario.contato.telefone === input.contato.telefone),
        email: lista.some(usuario => usuario.contato.email === input.contato.email)
    };

    if (dadosBusca.telefone) {
        resultado.telefone = { campo: 'telefone', valor: input.contato.telefone, id: lista.find(usuario => usuario.contato.telefone === input.contato.telefone).id, erro: dadosBusca.telefone, mensagem: "telefone existente!" };
    } else {
        resultado.telefone = { campo: 'telefone', valor: '', id: '', erro: dadosBusca.telefone, mensagem: "" };
    };

    if (dadosBusca.email) {
        resultado.email = { campo: 'email', valor: input.contato.email, id: lista.find(usuario => usuario.contato.email === input.contato.email).id, erro: dadosBusca.email, mensagem: "email existente!" };
    } else {
        resultado.email = { campo: 'email', valor: '', id: '', erro: dadosBusca.email, mensagem: "" };
    };
    resultado.contatoValido = validacaoGeral(resultado);

    return resultado;

};