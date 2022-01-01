const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
    posts: [Post]
    post: Post
  }

  type User {
    id: ID!
    name: String!
    username: String!
  }

  type Post {
    id: ID!
    author: User!
    title: String!
    body: String!
    date: Int!
    commentNum: Int!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    body: String!
    author: User!
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
      author: {
        name:"Sotiris Morfakidis",
        username:"sotirismorf"
      },
      body:"This is a post",
      date:12,
      commentNum:4
    }),

    posts: () => ([
      {
        id:1234,
        title:"My first post!",
        author: {
          name:"Sotiris Morfakidis",
          username:"sotirismorf"
        },
        body:"This is a post",
        date:12,
        commentNum:4
      },
      {
        id:1234,
        title:"My second post!",
        author: {
          name:"Sotiris Morfakidis",
          username:"sotirismorf"
        },
        body:"This is a post",
        date:12,
        commentNum:4
      },
    ])
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`server started at ${url}`))
