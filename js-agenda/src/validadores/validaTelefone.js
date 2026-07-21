import { retornaComposicaoInput } from './analisaTexto.js';

export function validaTelefone(inputUser) {
    let resultado = {};
    let input = retornaComposicaoInput(inputUser);
    let validacao = validaInputFone(input);

    resultado.telefone = inputUser;

    if (validacao.quantidadeEspaco) {

        resultado = {
            erro: true,
            mensagem: `Telefone não pode ter espaço, verifique o telefone digitado!`
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            erro: true,
            mensagem: `Telefone contem "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`
        };

    } else if (validacao.tamanhoMenor) {

        resultado = {
            erro: true,
            mensagem: "Telefone faltando digitos, digite os 9 digitos!"
        };

    } else if (validacao.tamanhoMaior) {

        resultado = {
            erro: true,
            mensagem: "Telefone com muitos digitos, digite apenas 9 digitos!"
        };

    } else {
        resultado = {
            erro: false,
            mensagem: ""
        };
    };

    return resultado;
};

function validaInputFone(inputUser) {
    let resultado = {};

    resultado.quantidadeEspaco = inputUser.quantidadeEspaco > 0;
    resultado.tamanhoMenor = inputUser.numero.length < 9;
    resultado.tamanhoMaior = inputUser.numero.length > 9;
    resultado.caracteresInvalidos = inputUser.caracteresEspecial.length > 0 || inputUser.letras.length > 0;
    resultado.caracteres = inputUser.letras + inputUser.caracteresEspecial;

    return resultado;
};