const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

// Defina os tipos Poll e Option aqui, semelhante ao exemplo anterior.

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    poll: {
      type: PollType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Lógica para buscar uma votação por ID
      },
    },
    // Outras consultas, se necessário
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createPoll: {
      type: PollType,
      args: {
        question: { type: GraphQLString },
        options: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        // Lógica para criar uma nova votação
      },
    },
    // Outras mutações, como registrar votos
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
