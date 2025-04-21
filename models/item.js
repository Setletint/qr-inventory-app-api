const BaseModel = require('./baseModel');
const mongoose = require('mongoose');

class ItmeModel extends BaseModel {
  constructor() {
    super('Item', [
      { name: 'name', options: { type: String, required: true } },
      { name: 'owner', options: { type: String, required: true } },
      { name: 'qrCode', options: { type: String } },
      { name: 'isPrivate', options: { type: Boolean, default: false } },
      { name: 'authorizedUsers', options: { type: [String], default: [] } },
      { name: 'authorizedCallenderUsers', options: { type: [String], default: [] } },
      { name: 'callenderData', options: { type: mongoose.Schema.Types.Mixed, default: '' } },
      { name: 'content', options: { type: mongoose.Schema.Types.Mixed, default: '' } },
    ]);
  }

  async getItemsByOwner(id) {
    return await this.model.find({ owner: id }).select('_id name');
  }
}

module.exports = new ItmeModel();
