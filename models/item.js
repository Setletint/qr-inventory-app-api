const BaseModel = require('./baseModel');
const mongoose = require('mongoose');

class ItmeModel extends BaseModel {
  constructor() {
    super('Item', [
      { name: 'name', options: { type: String, required: true } },
      { name: 'owner', options: { type: String, required: true } },
      { name: 'authorizedCallenderUsers', options: { type: String } },
      { name: 'callenderData', options: { type: mongoose.Schema.Types.Mixed } },
      { name: 'content', options: { type: mongoose.Schema.Types.Mixed } },
    ]);
  }

  async getItemsByOwner(id) {
    return await this.model.find({owner: id}).select('_id name');
  }
}

module.exports = new ItmeModel();
