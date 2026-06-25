//  Funções principais para validações
export function validaTelefone(inputUser) {
    let resultado = {};
    let input = retornaComposicaoInput(inputUser);
    let validacao = validaInputFone(input);

    resultado.telefone = inputUser;


    if (input.quantidadeEspaco === input.tamnhoInput) {

        resultado.erro = true;
        resultado.mensagem = `Campo obrigatório, digite um telefone válido!`;

    } else {
        if (validacao.quantidadeEspaco) {

            resultado.erro = true;
            resultado.mensagem = `Telefone não pode ter espaço, verifique o telefone digitado!`;

        } else if (validacao.caracteresInvalidos) {

            resultado.erro = true;
            resultado.mensagem = `Telefone contem "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`;

        } else if (validacao.tamanhoMenor) {

            resultado.erro = true;
            resultado.mensagem = "Telefone faltando digitos, digite os 9 digitos!";

        } else if (validacao.tamanhoMaior) {

            resultado.erro = true;
            resultado.mensagem = "Telefone com muitos digitos, digite apenas 9 digitos!";

        } else {

            resultado.erro = false;

        };
    };
    return resultado;

};

// funções gerais para validar telefone
function validaInputFone(inputUser) {
    let resultado = {};

    resultado.quantidadeEspaco = inputUser.quantidadeEspaco > 0;
    resultado.tamanhoMenor = inputUser.numero.length < 9;
    resultado.tamanhoMaior = inputUser.numero.length > 9;
    resultado.caracteresInvalidos = inputUser.caracteresEspecial.length > 0 || inputUser.letras.length > 0;
    resultado.caracteres = inputUser.letras + inputUser.caracteresEspecial;

    return resultado;
};

// funções gerais de validação
function retornaComposicaoInput(inputUser) {
    let componentes = {};

    componentes.quantidadeEspaco = inputUser.replace(/[^\s]/g, "").length;
    componentes.tamnhoInput = inputUser.length;
    componentes.caracteresEspecial = inputUser.replace(/[^\W_]/g, "");
    componentes.letras = inputUser.replace(/[^a-z]/g, "");
    componentes.numero = inputUser.replace(/[^\d]/g, "");

    return componentes;

};