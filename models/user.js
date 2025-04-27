const BaseModel = require('./baseModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserModel extends BaseModel {
  constructor() {
    super('User', [
      { name: 'username', options: { type: String, required: true, unique: true } },
      { name: 'email', options: { type: String, required: true, unique: true } },
      { name: 'password', options: { type: String, required: true } },
      { name: 'token', options: { type: String, default: '' } }
    ]);
  }

  async getUserIdByMail(email) {
    return await this.model.findOne({ email: email }).select('_id');
  }

  async getUserEmailById(id) {
    return await this.model.findOne({ _id: id }).select('email');
  }

  async checkToken(userId, token) {
    if (token == '') return false;

    const checker = await this.model.findOne({ _id: userId, token: token });

    if (checker) {
      return true;
    }

    return false;
  }

  async checkCredentials(email, password) {
    const account = await this.model.findOne({ email: email });

    if (account) {
      return await bcrypt.compare(password, account.password);
    }

    return false;
  }

  async getTokenByEmail(email) {
    const account = await this.model.findOne({ email: email });
    return account.token;
  }

  async generateToken(email) {
    let token;
    let isDuplicate = true;

    while (isDuplicate) {
      token = crypto.randomBytes(32).toString('hex');
      const existing = await this.model.findOne({ token: token });
      if (!existing) {
        isDuplicate = false;
      }
    }

    await this.model.findOneAndUpdate({ email: email }, { token: token });
    return token;
  }

  async deleteToken(userId, token) {

    if (! await this.checkToken(userId, token)) {
      return false;
    }

    return await this.update(userId, { token: '' });
  }
}

module.exports = new UserModel();
