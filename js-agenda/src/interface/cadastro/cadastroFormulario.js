import { salvarContato } from "../../repositorio/agendaRepositorio.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";
import {criarPessoa} from "../../servicos/agendaService.js";
import {validaPessoa,verificaDuplicidade} from "../../validadores/validaPessoa.js";
export function processaFormulario(elemento) {
    const formData = new FormData(elemento.formulario);
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

export function enviarFormulario(dados) {

    salvarContato(dados.pessoa, dados.validacao);
    modalContatoSalvo();
};

