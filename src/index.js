require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
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
const User = require('./api/user/user.model');

// connect to MongoDB
connect(config.dbUrl);

// initiaite the express app
const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

// decode the JWT so we can get the userId on each request
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = userId;
    console.log('WE HAVE A TOKEN!!');
  }
  console.log('WE DONT HAVE A TOKEN :(');
  next();
});

// create a middleware that populates the user on each request
app.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await User.findOne({ id: req.userId });
  req.user = user;
  next();
});

// Apollo Sever
const types = ['registration', 'session', 'crew', 'user'];

const start = async () => {
  const rootSchema = `
		schema {
      query: Query,
      mutation: Mutation
		}
  `;

  // Combines all of the gql files into a single schema
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
    context: ({ req }) => {
      // 1. get the token from the headers
      // const token = req.headers.authorization || '';
      // console.log(req);
      // 2. try to retrieve a user with the token
      // const loggedInUser = null;
      // const loggedInUser = {
      //   id: '1ldskajdsl;fj',
      //   username: 'seanhasenstein',
      //   password: 'password'
      // };
      // if no user, throw an AuthenticationError
      // if (!loggedInUser) throw new AuthenticationError('You must be logged in');
      // if their is a user, then add it to the context
      return { ...req };
    }
  });
  server.applyMiddleware({ app, cors: corsOptions });
};

start();

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// module.exports = start;
