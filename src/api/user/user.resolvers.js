// const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const user = (_, args, ctx) => {
  // if (!ctx.user) {
  //   throw new AuthenticationError();
  // }
  return ctx.user;
};

const me = async (_, args, ctx) => {
  // check if there is a current user ID
  if (!ctx.userId) {
    return null;
  }
  const user = await User.findById(ctx.userId);
  return user;
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

const login = async (_, args, ctx) => {
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
  ctx.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31
  });
  // 5. return the user
  return user;
};

const logout = (_, args, ctx) => {
  ctx.res.clearCookie('token');
  return { message: 'Successfully Logged Out' };
};

module.exports = {
  Query: {
    user,
    me,
    getAllUsers
  },
  Mutation: {
    createAdmin,
    login,
    logout
  },
  User: {
    id(user) {
      return user._id;
    }
  }
};
