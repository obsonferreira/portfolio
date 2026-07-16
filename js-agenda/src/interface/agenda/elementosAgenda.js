const spanContato = document.getElementById('quantidade-contatos');
const spanSemContato = document.getElementById('sem-contato');
const divBusca = document.getElementById('busca-contato');
const inputBusca = document.getElementById('input-busca');

const modalContato = document.getElementById('modal-contato');
const modalAlertas = document.getElementById('modal-alertas');
const formulario = document.getElementById('formulario-modal');

const alertaNome = document.getElementById('alerta-nome');
const alertaSobrenome = document.getElementById('alerta-sobrenome');
const alertaTelefone = document.getElementById('alerta-telefone');
const alertaEmail = document.getElementById('alerta-email');

const botaoBusca = document.getElementById('botao-busca');
const botaoEditarForm = document.getElementById('editar-form');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoSair = document.getElementById('btn-sair');
const botaoSairAlteracao = document.getElementById('btn-sair-alteracao');
const botaoSairDuplicida = document.getElementById('btn-sair-duplicidade');
const botaoSim = document.getElementById('btn-sim');
const botaoNao = document.getElementById('btn-nao');

const mensagemExclusao = document.getElementById('container-exclusao');
const mensagemAlteracao = document.getElementById('container-alteracao');

const tabela = document.getElementById('tabela-contato');

export const elementoAlertaAgenda = {};
export const elementoDialogoAgenda = {};
export const elementoVisorAgenda = {};
export const elementoCadastroAgenda = {};
export const elementoTabelaAgenda = {};
