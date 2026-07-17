import { elementoDialogoAlertasAgenda, elementoDialogoAlteracaoAgenda } from "../agenda/elementosAgenda.js";
import { elementoDialogo, elementoAlerta } from "../cadastro/elementosCadastro.js";
import { ocultarAtributo, exibirMensagem } from "./notificacoes.js";
import { elementoAlertaAgenda } from './../agenda/elementosAgenda.js';

export function modalContatoSalvo() {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.contatoSalvo, 'Contato criado com sucesso!');
};

export function mensagemContatoAlterado() {
    elementoDialogoAlteracaoAgenda.modalContato.close();
    exibirMensagem(elementoAlertaAgenda.mensagemAlteracao,'Contato alterado!');
    elementoDialogoAlertasAgenda.modalAlertas.showModal();
}

