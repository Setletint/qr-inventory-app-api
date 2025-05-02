const Auth = require('../models/authAttempt');
const User = require('../models/user')

const LOGIN_COOLDOWN = process.env.LOGIN_COOLDOWN || 10;

exports.login = async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

  attempts = await Auth.lastAttemtpByIp(ip);
  const attemptId = attempts._id.toHexString();

  if (attempts) {

    const lastAttempt = new Date(attempts.updatedAt);
    const currentTime = new Date();

    if (((Math.abs(currentTime - lastAttempt) / (1000 * 60)) < LOGIN_COOLDOWN)) {
      Auth.clearAttempts(attemptId);
    }

    if (attempts.attempts < 5) {
      if (await checkCredentials(req.body.email, req.body.password)) {
        const token = await User.getTokenByEmail(req.body.email) || await User.generateToken(req.body.email);
        const userId = await User.getUserIdByMail(req.body.email);
        const username = await User.model.findOne({ email: req.body.email }).select('username -_id');

        // Ok
        return res.status(200).json({
          message: 'Login success',
          token: token,
          userId: userId._id,
          username: username.username
        });

      } else {
        Auth.updateAttemptsCount(attemptId, (attempts.attempts + 1));
        // Bad request
        return res.status(400).json({ message: 'Incorect credentials' });
      }
    } else {
      // Too Many Requests
      return res.status(429).json({ message: 'Too many login attempts were made' });
    }
  } else {
    if (await checkCredentials(req.body.email, req.body.password)) {
      const token = await User.generateToken(req.body.email);
      const userId = await User.getUserIdByMail(req.body.email);
      const username = await User.model.findOne({ email: req.body.email }).select('username -_id');

      // Ok
      return res.status(200).json({
        message: 'Login success',
        token: token,
        userId: userId._id,
        username: username.username
      });

    } else {
      Auth.create({ ip: ip, email: req.body.email || '' });
      // Bad Request
      return res.status(400).json({ message: 'Incorect credentials' });
    }
  }

  // Server Error
  return res.status(500).json({ message: 'Something went wrong, try later.' })
};

exports.logout = async (req, res) => {
  const userId = req.body.userId;
  const token = req.body.token;

  if (await User.checkToken(userId, token)) {

    const logout = await User.deleteToken(userId, token);

    // Ok
    if (logout) return res.status(200).json({ message: 'Logout success' });
  }

  // Bad request
  return res.status(400).json({ message: 'Something went wrong' });
};

const checkCredentials = async (email, password) => {
  return await User.checkCredentials(email, password);
}