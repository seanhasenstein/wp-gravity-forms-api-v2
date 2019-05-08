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

  return user;
};

const getAllUsers = async () => {
  return User.find({})
    .lean()
    .exec();
};

const signIn = async (_, args, ctx) => {
  // 1. check if there is a user with that email
  const user = await User.findOne({ email: args.input.email });
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
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });

  console.log('helloooooo');

  // 5. return the user
  return user;
};

const signOut = (_, args, ctx) => {
  ctx.res.clearCookie('token');
  return { message: 'You are successfully signed out!' };
};

module.exports = {
  Query: {
    user,
    getAllUsers,
    signIn,
    signOut
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
