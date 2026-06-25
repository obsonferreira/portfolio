import { log } from "node:console";
import sqlite3 from "sqlite3";

export class Banco {
  constructor(diretorio = "./repositorio/bancodados.db") {
    this.diretorio = diretorio;
    this.banco = new sqlite3.Database(this.diretorio);
  }

  criarTabelas() {
    this.banco.run('PRAGMA foreign_keys = ON');
    this.banco.serialize(() => {
      this.banco.run(`
        CREATE TABLE IF NOT EXISTS pessoas (
          id_pessoa INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          sobrenome TEXT)
      `);

      this.banco.run(`
        CREATE TABLE IF NOT EXISTS contatos (
          id_contato INTEGER PRIMARY KEY AUTOINCREMENT,
          telefone TEXT ,
          email TEXT,
          pessoa_id INTEGER,
          CONSTRAINT fk_pessoas_contatos FOREIGN KEY (pessoa_id) REFERENCES pessoas(id_pessoa))
      `);
    });
    console.log("Tabela criada ou já existente.");

  };

  fecharConexao() {

    this.banco.close((erro) => {
      if (erro) {
        console.error("Erro ao fechar a conexão:", erro.message);
      }
      console.log("Conexão fechada.");
    });

  };

  salvarContato(pessoa) {

    const conexao = this.banco;
    const dadosPessoais = Object.values(pessoa);


    this.banco.run(`INSERT INTO pessoas (nome, sobrenome) VALUES ( ?, ? )`, dadosPessoais[0], dadosPessoais[1], function (erro) {
      const contato = Object.values(pessoa.contato);
      const idDaPessoaCriada = this.lastID;

      contato.push(idDaPessoaCriada);
      conexao.run(`INSERT INTO contatos (telefone, email, pessoa_id) VALUES (?, ?, ?)`, contato);

    });


  };

};

// let pessoa = { nome: 'Obson', sobrenome: '' }
// let contato = { telefone: '991521702', email: 'obson@gmail.com' }
// pessoa.contato = contato;


// let banco = new Banco();

// banco.criarTabelas();
// banco.salvarContato(pessoa);


