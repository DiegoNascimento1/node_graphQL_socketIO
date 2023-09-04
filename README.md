# Sistema de Votação em Tempo Real

Este é um exemplo de aplicação de votação em tempo real usando Apollo Server, Socket.io, GraphQL e Express. Esta aplicação permite que os usuários recebam perguntas em tempo real e votem em suas opções favoritas.

## Pré-requisitos

- Node.js instalado em seu sistema
- npm (Node Package Manager) ou yarn

## Instalação

1. Clone este repositório em sua máquina local:

   ```
   git clone https://github.com/DiegoNascimento1/node_graphQL_socketIO.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd node_graphQL_socketIO
   ```

3. Instale as dependências usando npm ou yarn:

   ```
   npm install
   # ou
   yarn install
   ```

## Executando o Servidor

1. Inicie o servidor:

   ```
   npm start
   # ou
   yarn start
   ```

2. O servidor estará disponível em `http://localhost:4000/graphql`.

## Usando o Playground do Apollo

1. Abra o Playground do Apollo em seu navegador:

   ```
   http://localhost:4000/graphql
   ```

2. Use o Playground para testar consultas e mutações GraphQL em seu servidor em tempo real. Você pode adicionar novas perguntas e votar nas opções disponíveis.

    Exemplo:

    ```
    mutation {
        addQuestion(
            text: "Qual é o seu animal favorito?", 
            options: ["Cachorro","Gato", "Peixe"]
        ){
            id
            text
            options
            results
        }  
    }
    ```

## Usando a Página HTML do Cliente

1. Abra a página HTML do cliente em seu navegador:

   ```
   http://localhost:4000/client.html
   ```

2. Use a página do cliente para receber e responder às perguntas em tempo real.

## Personalização

- Você pode personalizar as perguntas iniciais e as opções no arquivo `server.js`.
- Personalize a aparência e o comportamento da página HTML do cliente em `client.html` conforme suas necessidades.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias ou correções.