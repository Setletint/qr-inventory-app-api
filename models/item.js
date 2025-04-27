const BaseModel = require('./baseModel');
const mongoose = require('mongoose');

class ItmeModel extends BaseModel {
  constructor() {
    super('Item', [
      { name: 'name', options: { type: String, required: true } },
      { name: 'owner', options: { type: String, required: true } },
      { name: 'isPrivate', options: { type: Boolean, default: false } },
      { name: 'authorizedUsers', options: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'User'} },
      { name: 'authorizedCallenderUsers', options: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'User' } },
      { name: 'callenderData', options: { type: mongoose.Schema.Types.Mixed, default: '' } },
      { name: 'content', options: { type: mongoose.Schema.Types.Mixed, default: '' } },
    ]);
  }

  async getItemsByOwner(id) {
    return await this.model.find({ owner: id }).select('_id name');
  }

  async appendAuthorizedUser(itemId, userId) {
    return await this.model.updateOne(
      { _id: itemId },
      { $push: { authorizedUsers: userId } }
    );
  }

  async appendAuthorizedCallenderUser(itemId, userId) {
    return await this.model.updateOne(
      { _id: itemId },
      { $push: { authorizedCallenderUsers: userId } }
    );
  }

  async replaceAuthorizedUsers(itemId, usersArray) {
    return await this.model.updateOne(
      { _id: itemId },
      { $set: { authorizedUsers: usersArray } }
    );
  }

  async replaceAuthorizedCallenderUsers(itemId, usersArray) {
    return await this.model.updateOne(
      { _id: itemId },
      { $set: { authorizedCallenderUsers: usersArray } }
    );
  }
}

module.exports = new ItmeModel();
