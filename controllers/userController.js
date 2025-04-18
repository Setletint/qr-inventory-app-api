const User = require('../models/user');

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.model.findById(userId);

    if (!user) {
      // Not Found
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    // Internal Server Error
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(user);
};

exports.createUser = async (req, res) => {

  const { email, username, password } = req.body;

  if (!isEmail(email)) {
    // Bad Request
    return res.status(400).json({message: 'Email is invalid'})
  }

  const existingUser = await User.model.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    // Conflict
    return res.status(409).json({ message: 'User with this email or username already exists' });
  }

  const user = await User.create(req.body);
  
  // Created
  res.status(201).json(user);
};

const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};