
export function validaNome(inputUser) {
    let resultado = {};
    let input = retornaComposicaoInput(inputUser.toLowerCase());
    let validacao = validaInputNome(input);

    resultado.nome = inputUser.toLowerCase();

    if (input.quantidadeEspaco === input.tamnhoInput) {

        resultado.erro = true;
        resultado.mensagem = `Campo obrigatório, digite um nome válido!`;

    } else {

        if (validacao.quantidadeEspaco) {

            resultado.erro = true;
            resultado.mensagem = `Campo não pode ter espaço, verifique o campo novamente!`;

        } else if (validacao.caracteresInvalidos) {

            resultado.erro = true;
            resultado.mensagem = `Campo contem "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`;

        } else if (validacao.tamanho) {

            resultado.erro = true;
            resultado.mensagem = "Campo curto, campo deve ter minimo 3 letras!";

        } else {

            resultado.erro = false;

        };
    };

    return resultado;

};

// funções gerais para validar nome

function validaInputNome(inputUser) {
    let resultado = {};

    resultado.quantidadeEspaco = inputUser.quantidadeEspaco > 0;
    resultado.tamanho = inputUser.letras.length < 3;
    resultado.caracteresInvalidos = (inputUser.caracteresEspecial.length > 0 || inputUser.numero.length > 0);
    resultado.caracteres = inputUser.numero + inputUser.caracteresEspecial;

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