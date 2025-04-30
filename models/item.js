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
      {
        name: 'calendarData',
        options: {
          type: {
            events: [
              {
                id: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, default: '' },
                time: { type: Date, required: true },
                createdBy: { type: String, required: true }
              }
            ]
          },
          default: { events: [] }
        }
      },
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
