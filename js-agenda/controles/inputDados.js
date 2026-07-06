import { criarPessoa } from "../servicos/agendaService.js";
import { salvarContato, buscaContato, editarContato, deletarContato } from "../repositorio/agendaRepositorio.js";
import { validaPessoa } from "../validadores/validaPessoa.js";

const formulario = document.getElementById('formulario-contato');
const alertaNome = document.getElementById('alerta-nome');
const alertaSobrenome = document.getElementById('alerta-sobrenome');
const alertaTelefone = document.getElementById('alerta-telefone');
const alertaEmail = document.getElementById('alerta-email');
const spanAlerta = document.getElementById('span-alerta');
const parametro = new URLSearchParams(window.location.search);
const editar = parametro.has('editar');
const excluir = parametro.has('excluir');

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

    salvarContato(pessoa, validacao);

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

    formulario.reset();
});





