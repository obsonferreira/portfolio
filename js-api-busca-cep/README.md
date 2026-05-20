# BuscaCEP - Consulta de endereço por CEP

[HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
[JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
[API](https://img.shields.io/badge/API-ViaCEP-00A3D9?style=flat)

> Interface web que consulta endereços usando a API pública ViaCEP. Feita com HTML, CSS e JS puro. 
> Objetivo: entender consumo de API REST na prática antes de desenvolver minhas próprias APIs.

## Print

<img src="https://github.com/obsonferreira/portfolio/blob/main/js-api-busca-cep/demo-apiCep.gif" width="600" alt="Demo buscando CEP">

## Por que fiz

Estou iniciando no Back-end e quis primeiro sentir na pele como é consumir uma API REST.

Escolhi a ViaCEP por ser pública, bem documentada e simples de entender. 
Me forçou a tratar casos reais: CEP inválido retorna 400, CEP não existe retorna 200 com `erro: true`, API fora do ar retorna 500.

Essa visão vai me ajudar a construir endpoints melhores quando eu estiver do lado do servidor.

## O que faz o meu projeto

**Módulo CEP - `apiCep.js`**

- **Consulta ViaCEP**: Requisição GET que retorna endereço ou trata `erro: true`
- **Validação de entrada**: 
    - Formatos aceitos: `12345-678` e `12345678`
    - Bloqueia CEPs com dígitos repetidos: `11111-111`
    - Exige 8 dígitos numéricos. Letras são ignoradas
- **Tratamento de erros HTTP**: Feedback pro usuário em casos de 400, 404 e 500

## Como rodar

### Opção 1: Testar online
1. Acesse: https://obsonferreira.github.io/portfolio/
2. Pronto. Não precisa instalar nada

### Opção 2: Rodar local
1. `git clone https://github.com/obsonferreira/portfolio.git`
2. `cd portfolio-main/js-api-busca-cep`
3. Abra `index.html` no navegador

Não precisa de Node, não precisa de servidor. É HTML + JS puro.

## O que aprendi fazendo

1. Usar `async/await` e `fetch` pra consumir API REST
2. Interpretar status codes HTTP e o padrão `erro: true` da ViaCEP
3. Diferença entre validação client-side pra UX e server-side pra segurança
4. Manipular JSON e renderizar dados com `innerHTML`
5. Controlar estados de UI: loading, sucesso, erro
6. Por que CORS existe em requisições entre domínios

## Próximos passos

- [ ] Recriar como API própria com Node.js + Express
- [ ] Adicionar PostgreSQL pra cache de consultas
- [ ] Implementar autenticação JWT e rate limiting
- [ ] Documentar com Swagger

## Tecnologias

`JavaScript` `HTML5` `CSS3` `Fetch API` `ViaCEP API`
