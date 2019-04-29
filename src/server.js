require('dotenv').config();
const { ApolloServer, AuthenticationError } = require('apollo-server');
const merge = require('lodash.merge');
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
			query: Query
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
    context: () => {
      const currentUser = {
        id: 'abcd1234',
        username: 'seanhasenstein',
        password: 'password',
        role: 'admin'
      };

      if (!currentUser) throw new AuthenticationError('You must be logged in');
      return { currentUser };
    }
  });
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

module.exports = start;
