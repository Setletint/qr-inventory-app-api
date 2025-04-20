const BaseModel = require('./baseModel');

class AuthAttemptModel extends BaseModel {
  constructor() {
    super('AuthAttempt', [
      { name: 'ip', options: { type: String, required: true} },
      { name: 'email', options: { type: String} },
      { name: 'attempts', options: { type: Number, default: 1 } }
    ]);
  }

  async lastAttemtpByIp(ip) {
    return await this.model.findOne({ip: ip}, {}, {sort: { 'updatedAt' : -1}});
  }

  async updateAttemptsCount(id, updateCount) {
    return await this.model.findByIdAndUpdate(id, {attempts: updateCount});
  }

  async clearAttempts(id) {
    return await this.model.findByIdAndUpdate(id, {attempts: 0});
  }
}

module.exports = new AuthAttemptModel();
