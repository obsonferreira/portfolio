export function validaEmail(inputUser) {
    let resultado = {};
    let input = retornaComposicaoEmail(inputUser);
    let validacao = validaInputEmail(input);

    resultado.email = inputUser;

    if (input.quantidadeEspaco === input.tamnhoInput) {

        resultado.erro = true;
        resultado.mensagem = `Campo obrigatório, digite um email válido!`;

    } else {

        if (validacao.quantidadeEspaco) {

            resultado.erro = true;
            resultado.mensagem = `Email não pode ter espaço, verifique o email digitado!`;

        } else if (validacao.nomeDominio) {

            resultado.erro = true;
            resultado.mensagem = `O email falta nome do dominio ou faltando digitos, verifique o email digitado!`;

        } else if (validacao.complementoDominio) {

            resultado.erro = true;
            resultado.mensagem = `O email faltando ".com" ou similar, verifique o email digitado!`;

        } else if (validacao.arrobaExtra) {

            resultado.erro = true;
            resultado.mensagem = `Email com "@" excedente, verifique o email digitado!`;

        } else if (validacao.semArroba) {

            resultado.erro = true;
            resultado.mensagem = `Email sem "@", verifique o email digitado!`;

        } else if (validacao.pontoExtraDominio) {

            resultado.erro = true;
            resultado.mensagem = `Email com "." excedente, verifique o email digitado!`;

        } else if (validacao.semPontoDominio) {

            resultado.erro = true;
            resultado.mensagem = `Email sem ".", verifique o email digitado!`;

        } else if (validacao.caracteresInvalidosIdEmail) {

            resultado.erro = true;
            resultado.mensagem = `Email contém  ${input.caracteresInvalidosIdEmail.length > 1 ? "digitos inválidos:" : "digito inválido:"} " ${input.caracteresInvalidosIdEmail} ", verifique o email digitado!`;

        } else if (validacao.caracteresInvalidosDominioEmail) {

            resultado.erro = true;
            resultado.mensagem = `Domínio do email ${input.caracteresInvalidosDominioEmail.length > 1 ? "digitos inválidos:" : "digito inválido:"} " ${input.caracteresInvalidosDominioEmail} ", verifique o email digitado!`;

        } else if (validacao.inicioInvalido) {

            resultado.erro = true;
            resultado.mensagem = `O email não pode iniciar com "${input.primeiroDigitoEmail}", verifique o email digitado!`;

        } else if (validacao.finalInvalido) {

            resultado.erro = true;
            resultado.mensagem = `O email não pode terminar com "${input.ultimoDigitoEmail}", verifique o email digitado!`;

        } else if (validacao.caracterConsecutivosDominioEmail) {

            resultado.erro = true;
            resultado.mensagem = `O email não pode ter apos o "@", "${input.caracterConsecutivosDominioEmail}" consecutivos, verifique o email digitado!`;

        } else if (validacao.caracterConsecutivosIdEmail) {

            resultado.erro = true;
            resultado.mensagem = `O email não pode ter "${input.caracterConsecutivosIdEmail}" consecutivos, verifique o email digitado!`;

        };
    };


    return resultado;
};

// funções gerais para validar email

function validaInputEmail(inputUser) {
    let resultado = {};
    const caracteresEspecial = /^[\W_]$/;

    resultado.quantidadeEspaco = inputUser.quantidadeEspaco > 0;
    resultado.semArroba = inputUser.caracterValidoEmail.length === 0;
    resultado.arrobaExtra = inputUser.caracterValidoEmail.length > 1;

    resultado.caracteresInvalidosIdEmail = inputUser.caracteresInvalidosIdEmail.length > 0;
    resultado.caracterConsecutivosIdEmail = inputUser.caracterConsecutivosIdEmail.length > 0;
    resultado.nomeDominio = inputUser.nomeDominio.length <= 1;
    resultado.complementoDominio = inputUser.complementoDominio.length <= 1;

    resultado.inicioInvalido = caracteresEspecial.test(inputUser.primeiroDigitoEmail);
    resultado.finalInvalido = caracteresEspecial.test(inputUser.ultimoDigitoEmail);

    resultado.caracterConsecutivosDominioEmail = inputUser.caracterConsecutivosDominioEmail.length > 0;
    resultado.caracteresInvalidosDominioEmail = inputUser.caracteresInvalidosDominioEmail.length > 0;
    resultado.pontoExtraDominio = inputUser.caracterValidosDominioEmail.length > 2;
    resultado.semPontoDominio = inputUser.caracterValidosDominioEmail.length === 0;

    return resultado;
};

function retornaComposicaoEmail(inputUser) {
    let componentes = {};

    let posicaoArroba = inputUser.indexOf('@');

    componentes.quantidadeEspaco = inputUser.replace(/[^\s]/g, "").length;
    componentes.tamnhoInput = inputUser.length;

    componentes.idEmail = inputUser.substring(0, posicaoArroba);
    componentes.caracteresInvalidosIdEmail = componentes.idEmail.replace(/[\w_.]/g, "");
    componentes.caracterConsecutivosIdEmail = retornaConsecutivos(componentes.idEmail);

    componentes.dominioEmail = inputUser.substring(posicaoArroba + 1);
    componentes.caracteresInvalidosDominioEmail = componentes.dominioEmail.replace(/[A-Za-z.]/g, "");
    componentes.nomeDominio = componentes.dominioEmail.substring(0, componentes.dominioEmail.indexOf('.'));
    componentes.complementoDominio = componentes.dominioEmail.substring(componentes.dominioEmail.indexOf('.') + 1, componentes.dominioEmail.length);

    componentes.caracterConsecutivosDominioEmail = retornaConsecutivos(componentes.dominioEmail);
    componentes.caracterValidosDominioEmail = componentes.dominioEmail.replace(/[^.]/g, "");

    componentes.caracterValidoEmail = inputUser.replace(/[^@]/g, "");

    componentes.primeiroDigitoEmail = inputUser.at(0);
    componentes.ultimoDigitoEmail = inputUser.at(componentes.tamnhoInput - 1);

    return componentes;
};

function retornaConsecutivos(inputUser) {

    const caracteresEspecial = /^[\W_.-]$/;

    let iguais = [];

    for (let index = 0; index < inputUser.length; index++) {

        let caracter = inputUser.at(index);

        if (caracter === inputUser.at(index + 1) && caracteresEspecial.test(caracter)) {

            iguais.push(caracter);
        };
    };

    return iguais;
};

