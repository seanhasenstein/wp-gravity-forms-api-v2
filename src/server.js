require('dotenv').config();
const { ApolloServer, AuthenticationError } = require('apollo-server');
const merge = require('lodash.merge');
const config = require('./config');
const connect = require('./db');
const loadTypeSchema = require('./utils/schema');
const registration = require('./api/registration/registration.resolvers');
const session = require('./api/session/session.resolvers');
const crew = require('./api/crew/crew.resolver');
const user = require('./api/user/user.resolvers');
const {
  SingleRegistrationAPI,
  HsCrewRegistrationAPI
} = require('./api/registration/registration.datasource');

const types = ['registration', 'session', 'crew', 'user'];

const start = async () => {
  const rootSchema = `
		schema {
      query: Query,
      mutation: Mutation
		}
	`;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, registration, session, crew, user),
    dataSources: () => {
      return {
        singleRegistrationAPI: new SingleRegistrationAPI(),
        hsCrewRegistrationAPI: new HsCrewRegistrationAPI()
      };
    },
    async context({ req }) {
      console.log(req);
      // console.log('req.headers', req.headers);
      // 1. get the token from the headers
      const token = req.headers.authorization || '';

      // 2. try to retrieve a user with the token

      const user = {
        id: '1ldskajdsl;fj',
        username: 'seanhasenstein',
        password: 'password'
      };
      // if no user, throw an AuthenticationError
      // if (!user) throw new AuthenticationError('You must be logged in');
      // if their is a user, then add it to the context
      return { ...req };
    }
  });

  // connect to our MongoDB
  await connect(config.dbUrl);

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

module.exports = start;
