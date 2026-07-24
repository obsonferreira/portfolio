import { buscaContato } from "../../repositorio/agendaRepositorio.js";
import { elementoDialogoEdicao, elementoTabelaAgenda } from "./elementosAgenda.js";
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
    retornaDadosTabela(elementoTabelaAgenda.tabela);
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

function retornaDadosTabela(elemento) {
    
    const cabecalho = elemento.querySelectorAll('tr');
    const valorCabecalho = Array.from(cabecalho).map(linha => {
        const celulas = linha.querySelectorAll("td");
        console.log(celulas[1].getElementsByTagName("td").value)
        
        

    });
    
};