const BaseModel = require('./baseModel');

class UserModel extends BaseModel {
  constructor() {
    super('User', [
      { name: 'username', options: { type: String, required: true, unique: true } },
      { name: 'email', options: { type: String, required: true, unique: true } },
      { name: 'password', options: { type: String, required: true } }
    ]);
  }
}

module.exports = new UserModel();
