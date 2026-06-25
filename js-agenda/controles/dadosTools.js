import { Pessoa } from "../modelos/pessoa.js";
import { buscaContato, retornaLista } from "../repositorio/agendaRepositorio.js";
import { verificaInput } from "../repositorio/ferramentas.js";

const spanContato = document.getElementById('quantidade-contatos');
const spanSemContato = document.getElementById('sem-contato');
const divBusca = document.getElementById('busca-contato');
const inputBusca = document.getElementById('input-busca');
const botaoBusca = document.getElementById('botao-busca');

const lista = retornaLista();

const tabela = document.getElementById('tabela-contato');

document.addEventListener('DOMContentLoaded', () => {
    const corpo = document.createElement('tbody');

    let quantidadeContatos = lista.length

    spanContato.innerHTML = `${quantidadeContatos > 0 ? 'Contatos' : 'Contato'} salvo: ${quantidadeContatos}`

    if (quantidadeContatos === 0) {

        spanSemContato.removeAttribute('hidden');
        spanSemContato.innerHTML = "Agenda vazia!";

    } else {

        spanSemContato.setAttribute('hidden', "");

        lista.forEach(pessoa => {
            const valorLinha = document.createElement('tr');
            valorLinha.classList.add(lista.indexOf(pessoa) + 1);

            const tdIndex = document.createElement('td');
            tdIndex.textContent = lista.indexOf(pessoa) + 1;
            valorLinha.appendChild(tdIndex);

            const tdNome = document.createElement('td');
            tdNome.textContent = pessoa.nome;
            valorLinha.appendChild(tdNome);

            const tdSobrenome = document.createElement('td');
            tdSobrenome.textContent = pessoa.sobrenome;
            valorLinha.appendChild(tdSobrenome);

            [pessoa.contato].forEach(contatos => {

                const tdTelefone = document.createElement('td');
                tdTelefone.textContent = contatos.telefone;
                valorLinha.appendChild(tdTelefone);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = contatos.email;
                valorLinha.appendChild(tdEmail);

            });
            const urlEditar = `./contato.html?editar=${pessoa.id}`;
            const tdEditar = document.createElement('a');
            tdEditar.textContent = 'Editar';
            tdEditar.href = urlEditar;
            valorLinha.appendChild(tdEditar);

            const urlExcluir = `./contato.html?excluir=${pessoa.id}`;
            const tdExcluir = document.createElement('a');
            tdExcluir.textContent = 'Excluir';
            tdExcluir.href = urlExcluir;
            valorLinha.appendChild(tdExcluir);

            corpo.appendChild(valorLinha);

        });

        tabela.appendChild(corpo);
    };


});

botaoBusca.addEventListener('click', () =>{
    const input = inputBusca.value
    if (input.length <= 0) {
        const spanBusca = document.createElement('span');
        spanBusca.innerHTML = 'Campo não pode ser vázio!';
        divBusca.appendChild(spanBusca);
        
    }else{
        
        const resultado = buscaContato(input);
        
    
});
