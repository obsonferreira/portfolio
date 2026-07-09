import { criarPessoa } from "../servicos/agendaService.js";
import { salvarContato, buscaContato, editarContato, deletarContato } from "../repositorio/agendaRepositorio.js";
import { validaPessoa, verificaDuplicidade } from "../validadores/validaPessoa.js";

const formulario = document.getElementById('formulario-contato');
const alertaNome = document.getElementById('alerta-nome');
const alertaSobrenome = document.getElementById('alerta-sobrenome');
const alertaTelefone = document.getElementById('alerta-telefone');
const alertaEmail = document.getElementById('alerta-email');
const spanAlerta = document.getElementById('span-alerta');
const modal = document.getElementById('modal-contato-salvo');
const botaoFechar = document.getElementById('fechar-mensagem');
const alertaCadastro = document.getElementById('alerta-cadasatro');

formulario.addEventListener('submit', (event) => {

    event.preventDefault();

    alertaNome.setAttribute('hidden', "");
    alertaSobrenome.setAttribute('hidden', "");
    alertaTelefone.setAttribute('hidden', "");
    alertaEmail.setAttribute('hidden', "");
    const formData = new FormData(formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    const pessoa = criarPessoa(dadosObjeto);
    const validacao = validaPessoa(pessoa);
    const contatoExistente = verificaDuplicidade(pessoa);    
    
    if (validacao.nome.erro) {
        alertaNome.removeAttribute('hidden');
        alertaNome.innerHTML = validacao.nome.mensagem;
    };

    if (validacao.sobrenome.erro) {
        alertaSobrenome.removeAttribute('hidden');
        alertaSobrenome.innerHTML = validacao.sobrenome.mensagem;
    };

    if (validacao.telefone.erro) {
        alertaTelefone.removeAttribute('hidden');
        alertaTelefone.innerHTML = validacao.telefone.mensagem;
    };

    if (validacao.email.erro) {
        alertaEmail.removeAttribute('hidden');
        alertaEmail.innerHTML = validacao.email.mensagem;
    };

    if (contatoExistente.email.erro) {
        modal.showModal();
        alertaCadastro.innerHTML = contatoExistente.email.mensagem

    };
    if (contatoExistente.telefone.erro) {
        modal.showModal();
        alertaCadastro.innerHTML = contatoExistente.telefone.mensagem
    };

    if (validacao.contatoValido && contatoExistente.contatoValido) {
        modal.showModal();
        alertaCadastro.innerHTML = 'Contato criado com sucesso!'
        salvarContato(pessoa, validacao);

    };

    formulario.reset();
});

botaoFechar.addEventListener('click', () => {

    modal.close();

});




