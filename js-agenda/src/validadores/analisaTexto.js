export function retornaComposicaoInput(inputUser) {
    let componentes = {};

    return {
        quantidadeEspaco: inputUser.replace(/[^\s]/g, "").length,
        tamanhoInput: inputUser.length,
        caracteresEspecial: inputUser.replace(/[\p{L}\p{N}]/gu, ""),
        letras: inputUser.replace(/[^\p{L}]/gu, ""),
        numero: inputUser.replace(/[^\d]/g, "")
    };

};