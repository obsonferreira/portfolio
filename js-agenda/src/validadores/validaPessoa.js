import { buscaContato, listaId} from "../repositorio/agendaRepositorio.js";
import { validacaoGeral } from "./compartilhado.js";

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

    const resultadoBusca = listaId(pessoa);
    
    console.log(resultadoBusca);
};
    
// export function verificaDuplicidade(pessoa) {
//     const resultado = {};
    // const dadosPessoa = retorna(pessoa.id);
    // console.log(`pessoa.id funcao verificaDuplicidade ${pessoa.id}`);
    // console.log(`dadosPessoa funcao verificaDuplicidade ${}`);

    // for (const [chave, valor] of Object.entries(pessoa)) {
    //     if (valor !== "contato") {
    //         // console.log(chave, valor);
    //         resultado.chave = buscaContato(valor);
    //     }

    // }
    // for (const [chaveContato, valorContato] of Object.entries(pessoa.contato)) {
    //     // console.log(typeof(valorContato));
    //     resultado.chaveContato = buscaContato(valorContato);
    //     console.log(buscaContato(valorContato));

    // }

    // console.log(`resultado funcao verificaDuplicidade ${JSON.stringify(resultado)}`);
    // return resultado;
// };


