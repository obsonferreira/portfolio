import express from 'express';
import { Banco } from './bancoDeDados.js';
import { log } from 'node:console';


const agenda = express();
const porta = 3000;

agenda.use(express.json());
const banco = new Banco();
banco.criarTabelas();

agenda.get('/pessoas', (req, res) => {
    console.log('ta on');
    
});

agenda.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);

});
