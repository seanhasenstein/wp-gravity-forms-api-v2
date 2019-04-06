require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const merge = require('lodash.merge');
const loadTypeSchema = require('./utils/schema');
const registration = require('./api/registration/registration.resolvers');
const session = require('./api/session/session.resolvers');
const crew = require('./api/crew/crew.resolver');
const {
  SingleRegistrationAPI,
  HsCrewRegistrationAPI
} = require('./api/registration/registration.datasource');

const types = ['registration', 'session', 'crew'];

const start = async () => {
  const rootSchema = `
		schema {
			query: Query
		}
	`;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, registration, session, crew),
    dataSources: () => {
      return {
        singleRegistrationAPI: new SingleRegistrationAPI(),
        hsCrewRegistrationAPI: new HsCrewRegistrationAPI()
      };
    },
    context: {}
  });
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

module.exports = start;
