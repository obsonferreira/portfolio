import { elementoDialog, elementoAlerta } from "../cadastro/elementosCadastro.js";
import { ocultarAtributo, exibirMensagem } from "./notificacoes.js";

export function modalContatoSalvo() {
    elementoDialog.modalCadastro.showModal();
    exibirMensagem(elementoDialog.contatoSalvo, 'Contato criado com sucesso!');
};

elementoDialog.botaoFechar.addEventListener('click', () => {

    elementoDialog.modalCadastro.close();

});