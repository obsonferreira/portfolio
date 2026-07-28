import { editarContato } from "../../repositorio/agendaRepositorio.js";
import { mensagemContatoAlterado } from "../compartilhado/dialog.js";

export function editarFormulario(dados) {
    console.log(dados);
    
    editarContato(dados.pessoa, dados.validacao, dados.referencia);
    mensagemContatoAlterado();
};
