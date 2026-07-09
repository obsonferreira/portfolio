import { validaTelefone } from "../validadores/validaTelefone.js";
import { validaEmail } from "../validadores/validaEmail.js";

export class Contato {

    constructor(telefone, email) {

        this.telefone = telefone;
        this.email = email;
    };

    validarTelefone() {

        const resultado = validaTelefone(this.telefone);

        if (resultado.erro) {

            return resultado;

        };

        return {
            erro: false
        };
    };

    validarEmail() {

        const resultado = validaEmail(this.email);

        if (resultado.erro) {

            return resultado;

        };

        return {
            erro: false
        };
    };

    atualizarTelefone(novoTelefone) {

        this.telefone = novoTelefone;
    };

    atualizarEmail(novoEmail) {

        this.email = novoEmail;
    };

};