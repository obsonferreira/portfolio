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
const acao = editar || excluir;
let referencia = 0;
if (editar) {

    referencia = parseInt(parametro.get('editar'));
} else if (excluir) {

    referencia = parseInt(parametro.get('excluir'));
};

const botaoInput = document.getElementById('botao-formulario');

if (editar) {

    botaoInput.textContent = 'Salvar alteração';
} else if (excluir) {

    botaoInput.textContent = 'Excluir';

} else {
    botaoInput.textContent = "Novo contato";
};

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

    if (editar) {

        editarContato(pessoa, validacao, referencia);
    } else if (excluir) {

        deletarContato(referencia);
    } else {

        salvarContato(pessoa, validacao);
    };

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

if (acao) {

    const dados = buscaContato(referencia);

    if (dados.erro) {
        
        formulario.setAttribute("hidden","");
        spanAlerta.removeAttribute('hidden');
        spanAlerta.innerHTML = dados.erro;

    } else {
        document.addEventListener('DOMContentLoaded', () => {
            for (const chave in dados) {

                if (formulario.elements[chave]) {

                    formulario.elements[chave].value = dados[chave];

                };
                if (chave === "contato") {

                    for (const contato in dados.contato) {

                        if (formulario.elements[contato]) {
                            formulario.elements[contato].value = dados.contato[contato];
                        };
                    };
                };
            };
        });

    };

};






