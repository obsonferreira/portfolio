import { buscaContato, retornaLista, editarContato, deletarContato} from "../repositorio/agendaRepositorio.js";

export function editarFormulario(dados) {
    editarContato(dados.pessoa, dados.validacao, dados.referencia);
    
};
