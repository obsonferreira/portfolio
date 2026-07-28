export function validaDuplicidade(input,lista) {
    const resultado = {};
    const dadosBusca = {
        nome: lista.some(usuario => usuario.nome === input.nome),
        sobrenome: lista.some(usuario => usuario.sobrenome === input.sobrenome),
        telefone: lista.some(usuario => usuario.contato.telefone === input.contato.telefone),
        email: lista.some(usuario => usuario.contato.email === input.contato.email)
    };
    console.log(dadosBusca);
    console.log(input);

    if (dadosBusca.nome) {
        resultado.nome = { dado: input.nome, id: lista.find(usuario => usuario.nome === input.nome).id, erro: dadosBusca.nome, mensagem: "Nome existente!" };
    } else {
        resultado.nome = { dado: '', id: '', erro: dadosBusca.nome, mensagem: "" };
    };

    if (dadosBusca.sobrenome) {
        resultado.sobrenome = { dado: input.sobrenome, id: lista.find(usuario => usuario.sobrenome === input.sobrenome).id, erro: dadosBusca.sobrenome, mensagem: "sobrenome existente!" };
    } else {
        resultado.sobrenome = { dado: '', id: '', erro: dadosBusca.sobrenome, mensagem: "" };
    };

    if (dadosBusca.telefone) {
        resultado.telefone = { dado: input.contato.telefone, id: lista.find(usuario => usuario.contato.telefone === input.contato.telefone).id, erro: dadosBusca.telefone, mensagem: "telefone existente!" };
    } else {
        resultado.telefone = { dado: '', id: '', erro: dadosBusca.telefone, mensagem: "" };
    };

    if (dadosBusca.email) {
        resultado.email = { dado: input.contato.email, id: lista.find(usuario => usuario.contato.email === input.contato.email).id, erro: dadosBusca.email, mensagem: "email existente!" };
    } else {
        resultado.email = { dado: '', id: '', erro: dadosBusca.email, mensagem: "" };
    };

    return resultado;
    
};