export function alertaBuscaContato() {
    const alertaBusca = document.createElement('span');
    alertaBusca.textContent = 'Campo não pode ser vázio!';
    return alertaBusca;
};

export function criarBotaoEditar(pessoa) {

    const td = document.createElement('td');
    const botao = document.createElement("button");
    botao.classList.add("btn-editar");
    botao.textContent = "Editar";
    botao.dataset.pessoa = pessoa;
    td.appendChild(botao);
    return td;
};
