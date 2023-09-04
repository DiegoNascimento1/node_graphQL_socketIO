const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const http = require('http');
const socketIo = require('socket.io');

// Defina o tipo GraphQL para as perguntas e respostas
const typeDefs = gql`
  type Query {
    questions: [Question]
    question(id: ID!): Question
  }

  type Question {
    id: ID!
    text: String!
    options: [String!]!
    results: [Int!]!
  }

  type Mutation {
    vote(questionId: ID!, optionIndex: Int!): Question
    addQuestion(text: String!, options: [String!]!): Question
  }
`;

// Inicialize algumas perguntas de exemplo
const questions = [
  {
    id: '1',
    text: 'Qual é a sua cor favorita?',
    options: ['Vermelho', 'Azul', 'Verde'],
    results: [0, 0, 0],
  },
  {
    id: '2',
    text: 'Qual é a sua fruta favorita?',
    options: ['Maçã', 'Banana', 'Morango'],
    results: [0, 0, 0],
  },
];

// Resolvers para os tipos GraphQL
const resolvers = {
  Query: {
    questions: () => questions,
    question: (_, { id }) => questions.find((q) => q.id === id),
  },
  Mutation: {
    vote: (_, { questionId, optionIndex }) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) {
        throw new Error('Pergunta não encontrada');
      }

      question.results[optionIndex]++;
      console.log(question);
      return question;
    },
    addQuestion: (_, { text, options }) => {
      const newQuestion = {
        id: String(questions.length + 1),
        text,
        options,
        results: new Array(options.length).fill(0),
      };

      questions.push(newQuestion);

      // Emita a nova pergunta para todos os clientes via Socket.io
      io.emit('newQuestion', questions);

      return newQuestion;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const server = new ApolloServer({
  schema,
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
    cors: {
        origin: '*', // Altere para o endereço do seu cliente web
        methods: ['GET', 'POST'],
      },
});

// Inicialize o servidor Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado via Socket.io');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado via Socket.io');
  });

  socket.on('vote', ({ questionId, optionIndex }) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) {
      console.log('Pergunta não encontrada');
      return;
    }
    question.results[optionIndex]++;
    console.log(question);
    io.emit('newQuestion', questions);
  });
});

// Inicialize o servidor HTTP
httpServer.listen(4000, () => {
  console.log('Servidor Apollo rodando em http://localhost:4000/graphql');
});

