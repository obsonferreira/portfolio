import { editarContato } from "../../repositorio/agendaRepositorio.js";

export function editarFormulario(dados) {
    console.log(dados);

    editarContato(dados.pessoa, dados.validacao, dados.referencia,dados.duplicidade);

};

export function verificaEdicao(resultado) {
    let contador = 0;

    for (const chave in resultado.duplicidade) {
        if (chave !== 'contatoValido') {
            if (resultado.duplicidade[chave].id === resultado.referencia) {
                console.log(resultado.duplicidade[chave].id);

                contador++;
            }
        }

    };

    return contador !== 4;
};