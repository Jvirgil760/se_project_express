const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require("../models/user");
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, CONFLICT } = require('../utils/errors');

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ 
      message: 'The "email" and "password" fields are required' 
    });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }

      // Duplicate email error
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ 
      message: 'The "email" and "password" fields are required' 
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Unauthorized") {
        // This means the email/password combination was wrong
        return res.status(401).send({ message: 'Incorrect email or password' });
      }
      
      // For any other error (database issues, network problems, etc.)
      return res.status(500).send({ message: 'An error occurred on the server' });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id; // comes from auth middleware payload

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal server error" });
    });
};


module.exports = { createUser, login, getCurrentUser, updateCurrentUser };
