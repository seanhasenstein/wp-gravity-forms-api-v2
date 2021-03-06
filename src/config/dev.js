const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  dbUrl: `mongodb+srv://${process.env.DEV_DB_USERNAME}:${
    process.env.DEV_DB_PASSWORD
  }@officials-connection-development-ga5xg.mongodb.net/test?retryWrites=true`
};

module.exports = config;
