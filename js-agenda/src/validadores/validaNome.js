import { retornaComposicaoInput } from './analisaTexto.js';

export function validaNome(inputUser) {
    let resultado = {};
    let input = retornaComposicaoInput(inputUser.toLowerCase());
    let validacao = validaInputNome(input);

    resultado.nome = inputUser.toLowerCase();

    if (validacao.quantidadeEspaco) {

        resultado = {
            erro: true,
            mensagem: `Campo não pode ter espaço, verifique o campo novamente!`
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            erro: true,
            mensagem: `Campo contem "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`
        };

    } else if (validacao.tamanho) {

        resultado = {
            erro: true,
            mensagem: "Campo curto, campo deve ter minimo 3 letras!"
        };

    } else {

        resultado = {
            erro: false,
            mensagem: ""
        };
    };

    return resultado;
};

function validaInputNome(inputUser) {
    let resultado = {};

    resultado.quantidadeEspaco = inputUser.quantidadeEspaco > 0;
    resultado.tamanho = inputUser.letras.length < 3;
    resultado.caracteresInvalidos = (inputUser.caracteresEspecial.length > 0 || inputUser.numero.length > 0);
    resultado.caracteres = inputUser.numero + inputUser.caracteresEspecial;

    return resultado;
};



