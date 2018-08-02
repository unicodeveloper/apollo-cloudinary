const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    uploads: (root, args, context) => {
      return "Hello world! It's your boy, how far now unicodeveloper";
    },
  },
  Mutation: {
    async singleUpload(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;

      // 1. Validate file metadata.

      // 2. Stream file contents into local filesystem or cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )
      //console.log("Stream", stream);
      console.log("Filename", filename);
      console.log("mimetype", mimetype);
      console.log("encoding", encoding);

      return { stream, filename, mimetype, encoding };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});