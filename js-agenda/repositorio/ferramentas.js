export function verificaInput(inputUser) {

    const numeroTeste = /^[0-9]$/;
    const letraTeste = /^[a-zA-ZÀ-ÿ]$/;
    const caracteresEspecialTeste = /^[\W_.-]$/;

    let numero = 0;
    let letra = 0;
    let char = 0;

    for (let index = 0; index < inputUser.length; index++) {
        let caracter = inputUser.at(index);

        if (numeroTeste.test(caracter)) {
            numero++;

        } else if (letraTeste.test(caracter)) {
            letra++;

        } else {
            char++;

        };
    };

    if (numero === inputUser.length) {
        return { numero: true };

    } else if (letra === inputUser.length) {

        return { nome: true };

    } else {

        return { email: true };
    };
};

export function retronaId(input, lista) {

    const buscar = verificaInput(input.toString());
    let idContato;
    if (buscar.numero) {
        idContato = lista.find(usuario => usuario.telefone === input)
        if (!idContato) {
            idContato = lista.find(usuario => usuario.id === input)
        };

    } else if (buscar.nome) {
        idContato = lista.find(usuario => usuario.nome === input)
        if (!idContato) {
            idContato = lista.find(usuario => usuario.sobrenome === input)
        };

    } else if (buscar.email) {
        idContato = lista.find(usuario => usuario.email === input)
    }

    if (!idContato) {

        return { erro: 'contato não encontrado!' };
        
    };

    return idContato.id;

};

