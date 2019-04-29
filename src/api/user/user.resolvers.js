const { AuthenticationError } = require('apollo-server');

const user = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError();
  }
  return ctx.user;
};

module.exports = {
  Query: {
    user
  }
};
