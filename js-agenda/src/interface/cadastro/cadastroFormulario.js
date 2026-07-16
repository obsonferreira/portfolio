import { elementoAlerta, elementoCadastro } from "./elementosCadastro.js";
import { exibirMensagem, ocultarAtributo, exibirAtributo } from "../compartilhado/notificacoes.js";
import { criarPessoa } from "../../servicos/agendaService.js";
import { salvarContato } from "../../repositorio/agendaRepositorio.js";
import { validaPessoa, verificaDuplicidade } from "../../validadores/validaPessoa.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";

export function processaFormulario() {

    const formData = new FormData(elementoCadastro.formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    const pessoa = criarPessoa(dadosObjeto);
    const validacao = validaPessoa(pessoa);
    const dados = {
        pessoa: pessoa,
        validacao: validacao
    }
    // const contatoExistente = verificaDuplicidade(pessoa);
    return dados;
};

export function exibirErrosValidacao(validacao) {

    if (validacao.nome.erro) {
        exibirAtributo(elementoAlerta.nome);
        exibirMensagem(elementoAlerta.nome, validacao.nome.mensagem);
    };

    if (validacao.sobrenome.erro) {
        exibirAtributo(elementoAlerta.sobrenome);
        exibirMensagem(elementoAlerta.sobrenome, validacao.sobrenome.mensagem);
    };

    if (validacao.telefone.erro) {
        exibirAtributo(elementoAlerta.telefone);
        exibirMensagem(elementoAlerta.telefone, validacao.telefone.mensagem);
    };

    if (validacao.email.erro) {
        exibirAtributo(elementoAlerta.email);
        exibirMensagem(elementoAlerta.email, validacao.email.mensagem);
    };

    // if (!contatoExistente.contatoValido) {
    //     modal.showModal();
    //     if (contatoExistente.email.erro) {
    //         alertaEmailExistente.innerHTML = contatoExistente.email.mensagem;

    //     };
    //     if (contatoExistente.telefone.erro) {
    //         alertaTelefoneExistente.innerHTML = contatoExistente.telefone.mensagem;
    //     };
    // };
};
export function enviarFormulario(dados) {

    salvarContato(dados.pessoa, dados.validacao);
    modalContatoSalvo()
};
