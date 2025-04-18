const User = require('../models/user-test');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};