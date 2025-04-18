const mongoose = require('mongoose');

class BaseModel {
  constructor(name, fields) {
    const schemaDefinition = {};
    for (const field of fields) {
      schemaDefinition[field.name] = field.options || { type: String };
    }

    const schema = new mongoose.Schema(schemaDefinition, { timestamps: true });

    this.model = mongoose.models[name] || mongoose.model(name, schema);
  }

  async create(data) {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseModel;