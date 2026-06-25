export function validaContato(validacao) {
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
    let teste = pessoa.sobrenome.length;

    if (pessoa.sobrenome.length > 0) {

        validacao.sobrenome = pessoa.validarSobrenome();

    } else {

        validacao.sobrenome = { sobrenome: "", erro: false }

    };
    validacao.contatoValido = validaContato(validacao)

    return validacao;

};