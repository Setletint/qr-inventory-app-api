const BaseModel = require('./baseModel');

class AuthAttemptModel extends BaseModel {
  constructor() {
    super('AuthAttempt', [
      { name: 'ip', options: { type: String, required: true} },
      { name: 'email', options: { type: String} },
      { name: 'attempts', options: { type: Number, default: 1 } }
    ]);
  }
}

module.exports = new AuthAttemptModel();
