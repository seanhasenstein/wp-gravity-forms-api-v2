const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const user = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError();
  }
  return ctx.user;
};

const createAdmin = async (_, args) => {
  // lowercase their email
  const email = args.input.email.toLowerCase();

  //hash their password
  const password = await bcrypt.hash(args.input.password, 10);

  // create the user in the database
  const user = User.create({
    email,
    password
  });

  console.log(user);

  return user;
};

const getAllUsers = async () => {
  return User.find({})
    .lean()
    .exec();
};

const signIn = async (_, args) => {
  // 1. check if there is a user with that email
  const user = await User.find({ email: args.input.email });
  if (!user) {
    throw new Error('No user found with that email.');
  }
  // 2. check if the password is correct
  const valid = await bcrypt.compare(args.input.password, user.password);
  if (!valid) {
    throw new Error('Invalid Password!');
  }
  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  // 4. set the cookie with the token
  // code goes here...

  // 5. return the user
  return user;
};

module.exports = {
  Query: {
    user,
    getAllUsers,
    signIn
  },
  Mutation: {
    createAdmin
  },
  User: {
    id(user) {
      return user._id;
    }
  }
};
