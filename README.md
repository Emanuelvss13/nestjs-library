<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Teste para a vaga de estágio Backend na big data health.

Descrição do Desafio:

Você deverá desenvolver uma API para um sistema de gerenciamento de livros. A API deve permitir o cadastro, consulta, atualização e remoção de informações de livros em um banco de dados.

Requisitos Obrigatórios:
Cadastro de Livros:

Implementar um endpoint para cadastrar um novo livro.

O livro deve conter os campos: id, título, autor, ano de publicação, gênero, quantidade em estoque.

Consulta de Livros:

Implementar um endpoint para consultar todos os livros cadastrados.

Consulta por ID:

Implementar um endpoint para consultar um livro específico pelo seu id.

Atualização de Livros:

Implementar um endpoint para atualizar as informações de um livro, como título, autor, ano de publicação, etc.

Remoção de Livros:

Implementar um endpoint para remover um livro do sistema.

Validação de Dados:

Implementar validações básicas nos dados de entrada, como verificar se todos os campos obrigatórios estão preenchidos.

Funcionalidades Opcionais:
Integração com Banco de Dados Relacional:

Usar um banco de dados relacional (como PostgreSQL ou MySQL) e configurar a conexão com o NestJS.

Busca Avançada:

Implementar filtros de busca por autor, gênero ou ano de publicação.

Sistema de Reservas:

Implementar uma funcionalidade que permita aos usuários reservar um livro, diminuindo a quantidade em estoque.

Testes Automatizados:

Implementar testes unitários e de integração para validar o funcionamento da API.

## Instalação

```bash
$ npm i
```

## Running the app

```bash
# Se tiver o dokcer instalado, rode esse comando para cirar um banco de dados:
$ dokcer compose up -d

# Rode esse comando para popular o banco de dados com alguns registros:
$ npm run seed

# Rode a aplicação:
$ npm run start
```
