import { buscaContato } from "../repositorio/agendaRepositorio.js";
import { retronaId } from "../repositorio/ferramentas.js";

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
    // const dadosPessoa = buscaContato(pessoa.id);
    // console.log(`pessoa.id funcao verificaDuplicidade ${pessoa.id}`);
    // console.log(`dadosPessoa funcao verificaDuplicidade ${}`);

    // for (const [chave, valor] of Object.entries(pessoa)) {
    //     if (valor !== "contato") {
    //         // console.log(chave, valor);
    //         resultado.chave = buscaContato(valor);
    //     }

    // }
    for (const [chaveContato, valorContato] of Object.entries(pessoa.contato)) {
        // console.log(typeof(valorContato));
        resultado.chaveContato = buscaContato(valorContato);
        console.log(buscaContato(valorContato));

    }

    console.log(`resultado funcao verificaDuplicidade ${JSON.stringify(resultado)}`);
    return resultado;
};


