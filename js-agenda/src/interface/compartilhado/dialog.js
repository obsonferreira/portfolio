import { elementoDialogoAlertasAgenda,elementoAlertaAgenda, elementoDialogoAlteracaoAgenda } from "../agenda/elementosAgenda.js";
import { elementoDialogo, elementoAlerta } from "../cadastro/elementosCadastro.js";
import { ocultarAtributo, exibirMensagem, exibirAtributo } from "./notificacoes.js";

export function modalContatoSalvo() {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.contatoSalvo, 'Contato criado com sucesso!');
};

export function mensagemContatoAlterado() {
    elementoDialogoAlteracaoAgenda.modalContato.close();
    exibirAtributo(elementoDialogoAlteracaoAgenda.mensagemAlteracao);
    elementoDialogoAlertasAgenda.modalAlertas.showModal();
};
