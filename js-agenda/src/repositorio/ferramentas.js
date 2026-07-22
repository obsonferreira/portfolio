function verificaInput(inputUser) {

    const input = inputUser.toString();
    const numeroTeste = /^[0-9]$/;
    const letraTeste = /^[a-zA-ZÀ-ÿ]$/;
    const caracteresEspecialTeste = /^[\W_.-]$/;

    let numero = 0;
    let letra = 0;
    let char = 0;

    for (let index = 0; index < input.length; index++) {
        let caracter = input.at(index);

        if (numeroTeste.test(caracter)) {
            numero++;

        } else if (letraTeste.test(caracter)) {
            letra++;

        } else {
            char++;

        };
    };

    if (numero === input.length) {
        if (numero.length === 9) {
            return { output: input, numero: true };

        } else {
            return { output: parseInt(inputUser), numero: true };
        }
    } else if (letra === input.length) {

        return { output: input, nome: true };

    } else {

        return { output: input, email: true };
    };

};

export function retronaId(input, lista) {

    const buscar = verificaInput(input);
    let resultado;

    if (buscar.numero) {
        const resultadoTelefone = lista.find(usuario => usuario.contato.telefone === buscar.output);
        const resultadoId = lista.find(usuario => usuario.id === buscar.output);
        if (resultadoTelefone) {
            resultado = resultadoTelefone.id;

        };

        if (resultadoId.id) {
            resultado = resultadoId.id;

        };

    } else if (buscar.nome) {
        const resultadoNome = lista.find(usuario => usuario.nome === buscar.output);
        const resultadoSobrenome = lista.find(usuario => usuario.sobrenome === buscar.output);

        if (resultadoNome) {

            resultado = resultadoNome.id;
        };

        if (resultadoSobrenome) {

            resultado = resultadoSobrenome.id;
        };

    } else if (buscar.email) {
        const resultadoEmail = lista.find(usuario => usuario.contato.email === buscar.output);
        if (resultadoEmail) {

            resultado = resultadoEmail.id;
        };

    } else {

        return { erro: true, mensagem: 'contato não encontrado!' };
    };

    return resultado;
};

