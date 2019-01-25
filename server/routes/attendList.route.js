const Express = require("express");
const { ApolloServer } = require("apollo-server-express");
const requireText = require("require-text");
const typeDefs = requireText("../typeDefs/attendList.typeDef.gql", require);
const resolvers = require("../resolvers/attendList.resolver");

const app = Express.Router();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: "/" });

module.exports = app;
