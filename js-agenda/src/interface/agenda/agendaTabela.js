import { buscaContato } from "../../repositorio/agendaRepositorio.js";
import { elementoDialogoEdicao } from "./elementosAgenda.js";
import { criarBotaoEditar} from "../compartilhado/dom.js";

export function preencheFormulario(formulario, dadosBusca) {
    const dados = buscaContato(dadosBusca);
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

    elementoDialogoEdicao.modalEdicao.showModal();
};

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
};

export function criarTabelaContato(lista) {
    const corpo = document.createElement("tbody");
    lista.forEach((pessoa) => {
        const valorLinha = document.createElement("tr");
        valorLinha.classList.add(lista.indexOf(pessoa) + 1);

        valorLinha.appendChild(criarCelula(lista.indexOf(pessoa) + 1));
        valorLinha.appendChild(criarCelula(pessoa.nome));
        valorLinha.appendChild(criarCelula(pessoa.sobrenome));

        [pessoa.contato].forEach((contatos) => {
            valorLinha.appendChild(criarCelula(contatos.telefone));
            valorLinha.appendChild(criarCelula(contatos.email));
        });

        valorLinha.appendChild(criarBotaoEditar(pessoa.id));
        corpo.appendChild(valorLinha);
    });
    return corpo;
};