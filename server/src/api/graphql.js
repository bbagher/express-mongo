const { Router } = require("express");
const NewsEntry = require("../models/NewsEntry");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const graphql = Router();

var schema = buildSchema(`
  type News {
    _id: Int
    title: String
    content: String
  }

  type Query {
    news: [News]
  }
`);

var root = {
  news: async (root, { title }) => {
    try {
      const entries = await NewsEntry.find();
      console.log("👀", entries);
      return entries;
    } catch (error) {
      console.log("🚧", error);
    }
  }
};

graphql.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

console.log("Running GraphQL server at http://localhost:4444/graphql");

module.exports = graphql;
