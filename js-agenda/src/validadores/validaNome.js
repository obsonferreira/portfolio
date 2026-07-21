import { retornaComposicaoInput } from './analisaTexto.js';

export function validaNome(input,campo) {
    let resultado = {};
    const inputMinusculo = input.toLowerCase();
    const componentes = retornaComposicaoInput(inputMinusculo);
    const validacao = validaInputNome(componentes);

    if (validacao.quantidadeEspaco) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: `Campo não pode ter espaço, verifique o campo novamente!`
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: `Campo contem "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`
        };

    } else if (validacao.tamanho) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: "Campo curto, campo deve ter minimo 3 letras!"
        };

    } else {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: false,
            mensagem: ""
        };
    };

    return resultado;
};

function validaInputNome(input) {

    return {
        quantidadeEspaco: input.quantidadeEspaco > 0,
        tamanho: input.letras.length < 3,
        caracteresInvalidos: (input.caracteresEspecial.length > 0 || inputUser.numero.length > 0),
        caracteres: input.numero + input.caracteresEspecial
    };
};



