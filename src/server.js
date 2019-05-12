require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const merge = require('lodash.merge');
const connect = require('./db');
const config = require('./config');
const loadTypeSchema = require('./utils/schema');
const {
  SingleRegistrationAPI,
  HsCrewRegistrationAPI
} = require('./api/registration/registration.datasource');
const registration = require('./api/registration/registration.resolvers');
const session = require('./api/session/session.resolvers');
const crew = require('./api/crew/crew.resolver');
const user = require('./api/user/user.resolvers');
const User = require('./api/user/user.resolvers');

const types = ['registration', 'session', 'crew', 'user'];

const start = async () => {
  // Connect to the MongoDB
  connect(config.dbUrl);

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
    context({ req }) {
      return { ...req };
    }
  });

  const app = express();
  var corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use((req, res, next) => {
    // checks for user in cookies and adds userId to the requests
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userId;
    }
    next();
  });
  app.use(async (req, res, next) => {
    if (!req.userId) return next();
    const user = await User.findOne({ id: req.userId });
    req.user = user;
    next();
  });

  server.applyMiddleware({
    app,
    path: '/',
    cors: false // disables the apollo-server-express cors to allow the cors middleware use
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
};

module.exports = start;
