import { editarContato } from "../../repositorio/agendaRepositorio.js";

export function editarFormulario(dados) {
    console.log(dados);

    editarContato(dados.pessoa, dados.validacao, dados.referencia, dados.duplicidade);

};

export function verificaEdicao(dados) {
    console.log(dados);

    let contador = 0;
    const resultado = {};

    for (const chave in dados.duplicidade) {
        if (chave !== 'contatoValido') {
            if (dados.duplicidade[chave].id === dados.referencia) {
                console.log(dados.duplicidade[chave].id);
                resultado[chave] = { campo: chave, valor: dados.duplicidade }

                contador++;
            }
        }

    };
    console.log(resultado);
    

    return contador !== 4;
};