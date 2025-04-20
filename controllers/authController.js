const auth = require('../models/authAttempt');
const user = require('../models/user')
const bcrypt = require('bcrypt');

const LOGIN_COOLDOWN = 1;

exports.login = async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

  attempts = await auth.lastAttemtpByIp(ip);
  const attemptId = attempts._id.toHexString();

  if (attempts) {

    const lastAttempt = new Date(attempts.updatedAt);
    const currentTime = new Date();
    
    if (((Math.abs(currentTime - lastAttempt) / (1000 * 60) ) < LOGIN_COOLDOWN )) {
      auth.clearAttempts(attemptId);
    }

    if (attempts.attempts < 5) {
      if (await checkCredentials(req.body.email, req.body.password)) {
        const token = await user.generateToken(req.body.email);
        // Ok
        return res.status(200).json({message: 'Login success', token});
      } else {
        auth.updateAttemptsCount(attemptId, (attempts.attempts + 1));
        // Bad request
        return res.status(400).json({message: 'Incorect credentials'});
      }
    } else {
      // Too Many Requests
      return res.status(429).json({message: 'Too many login attempts were made'});
    }
  } else {
    if (await checkCredentials(req.body.email, req.body.password)) {
      const token = await user.generateToken(req.body.email);
      // OK
      return res.status(200).json({message: 'Login success', token: token});
    } else {
      auth.create({ip: ip, email: req.body.email || ''});
      // Bad Request
      return res.status(400).json({message: 'Incorect credentials'});
    }
  }
  
  // Server Error
  return res.status(500).json({message: 'Something went wrong, try later.'})
};

const checkCredentials = async (email, password) => {
  return await user.checkCredentials(email, password);
}