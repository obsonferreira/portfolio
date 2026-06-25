import { validaNome } from "../validadores/validaNome.js";

export class Pessoa {
    constructor(nome, sobrenome, contato) {
        
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.contato = contato;
        
    };

    validarNome() {

        const resultado = validaNome(this.nome);

        if (resultado.erro) {

            return resultado;

        };

        return {
            erro: false,
            mensagem: "Contato armazenado com sucesso."
        };

    };

    validarSobrenome() {

        const resultado = validaNome(this.sobrenome);

        if (resultado.erro) {

            return resultado;

        };

        return {
            erro: false,
            mensagem: "Contato armazenado com sucesso."
        };

    };

    atualizarNome(novoNome){

        this.nome = novoNome;
        
    };
    atualizarSobrenome(novoSobrenome){

        this.sobrenome = novoSobrenome;

    };

};


