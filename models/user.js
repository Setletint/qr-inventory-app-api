const BaseModel = require('./baseModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserModel extends BaseModel {
  constructor() {
    super('User', [
      { name: 'username', options: { type: String, required: true, unique: true } },
      { name: 'email', options: { type: String, required: true, unique: true } },
      { name: 'password', options: { type: String, required: true } },
      { name: 'token', options: { type: String } }
    ]);
  }

  async checkToken(userId, token) {
    const checker = await this.model.findOne({_id: userId, token: token});

    if (checker) {
      return true;
    }
    
    return false;
  }

  async checkCredentials(email, password) {
    const account = await this.model.findOne({email: email});
    
    if (account) {
      return await bcrypt.compare(password, account.password);
    }
    
    return false;
  }

  async generateToken(email) {
    const token = crypto.randomBytes(32).toString('hex');;
    await this.model.findOneAndUpdate({email: email}, {token: token});
    return token;
  }
}

module.exports = new UserModel();
