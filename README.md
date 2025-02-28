# Projeto Backend - Todo List API

Este projeto é a API backend para o sistema de gerenciamento de tarefas (Todo List). Ele foi desenvolvido utilizando Node.js, Express e firebase. Projeto possui testes e websocket para atualizações em tempo real.

## Sumário

- [Projeto Backend - Todo List API](#projeto-backend---todo-list-api)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Funcionalidades](#funcionalidades)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Configuração](#instalação-e-configuração)

## Descrição

A API permite gerenciar tarefas e status, realizar autenticação de usuários (incluindo login via Firebase e autenticação JWT) e emitir eventos via WebSockets para atualizações em tempo real. O projeto segue boas práticas de desenvolvimento, com validações robustas e testes unitários para garantir a qualidade do código.

## Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express** – Framework web para Node.js.
- **Firebase Admin** – Para autenticação via Firebase.
- **JSON Web Tokens (JWT)** – Para autenticação com tokens.
- **Socket.IO** – Para comunicação em tempo real.
- **Jest** – Testes unitários.

## Funcionalidades

- **Autenticação:**
  - Registro e login com credenciais tradicionais.
  - Login via Google (usando Firebase).
  - Middleware de proteção de rotas.
- **Gerenciamento de Tarefas:**
  - Criação, leitura, atualização e exclusão (CRUD) de tarefas.
  - Validação dos dados de entrada.
  - Atualizações em tempo real usando WebSockets.
- **Gerenciamento de Status:**
  - CRUD de status para categorizar tarefas.
  - Validações para garantir a integridade dos dados.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Conta no [Firebase](https://firebase.google.com/) (para autenticação com Google)

## Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Kenzohfs/todo-list-node-server.git
   cd nome-do-repositorio
   ```


2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto de acordo com o .env.example

4. **Configure o Firebase:**

   Crie um projeto no Firebase e adicione as credenciais no arquivo `.env`. Ative a autenticação com Google e copie a URL de redirecionamento para o arquivo `.env`.

   Além disso, é preciso gerar um arquivo de credenciais, nomeá-lo de serviceAccountKey.json e adicionar em /config.


5. **Inicie o servidor de desenvolvimento:**

   ```bash
   node server.js
   ```
