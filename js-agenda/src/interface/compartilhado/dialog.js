import { elementoDialogo, elementoAlerta } from "../cadastro/elementosCadastro.js";
import { ocultarAtributo, exibirMensagem } from "./notificacoes.js";

export function modalContatoSalvo() {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.contatoSalvo, 'Contato criado com sucesso!');
};

elementoDialogo.botaoFechar.addEventListener('click', () => {

    elementoDialogo.modalCadastro.close();

});