const BaseModel = require('./baseModel');
const mongoose = require('mongoose');

class ItmeModel extends BaseModel {
  constructor() {
    super('Item', [
      { name: 'name', options: { type: String, required: true } },
      { name: 'owner', options: { type: String, required: true } },
      { name: 'isPrivate', options: { type: Boolean, default: false } },
      { name: 'authorizedUsers', options: { type: [String], default: [] } },
      { name: 'authorizedCalendarUsers', options: { type: [String], default: [] } },
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

  async appendAuthorizedCalendarUser(itemId, userId) {
    return await this.model.updateOne(
      { _id: itemId },
      { $push: { authorizedCalendarUsers: userId } }
    );
  }

  async replaceAuthorizedUsers(itemId, usersArray) {
    return await this.model.updateOne(
      { _id: itemId },
      { $set: { authorizedUsers: usersArray } }
    );
  }

  async replaceAuthorizedCalendarUsers(itemId, usersArray) {
    return await this.model.updateOne(
      { _id: itemId },
      { $set: { authorizedCalendarUsers: usersArray } }
    );
  }
}

module.exports = new ItmeModel();
