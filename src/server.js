require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const merge = require("lodash.merge");
const loadTypeSchema = require("./utils/schema");
const registration = require("./api/registration/registration.resolvers");
const SingleRegistrationAPI = require("./api/registration/registration.datasource");

const types = ["registration"];

const start = async () => {
  const rootSchema = `
		schema {
			query: Query
		}
	`;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, registration),
    dataSources: () => {
      return {
        singleRegistrationAPI: new SingleRegistrationAPI()
      };
    },
    context: {}
  });
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

module.exports = start;
