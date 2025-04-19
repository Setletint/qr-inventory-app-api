const auth = require('../models/authAttempt');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const a = await auth.findById('6803b2bd01c389bcf6c9517b');
  const date = new Date(a.updatedAt);
  const now = new Date();
  // test if the record is older than 10 minutes
  res.json({message: date, now: now, more30: (Math.abs(now - date) / (1000 * 60) ) > 10});
};