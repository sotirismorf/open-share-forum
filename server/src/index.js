const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
    post: Post
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    date: Int!
  }

  type Mutation {
    register: User
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hesdklfjsllo world',
    users: () => [{id:34, username:"sotirismorf"}],

    post: () => ({
      id:1234,
      title:"My first post!",
      body:"This is a post",
      date:12})
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`server started at ${url}`))
