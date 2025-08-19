import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  model: { type: String, required: true },
  makeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Make', required: true }
}, {
  timestamps: true,
  collection: 'models'
});

// ---------- Static Methods ----------

modelSchema.statics.getAll = function (makeId = null) {
  if (makeId) {
    return this.find({ makeId }).populate('makeId').sort({ model: 1 }).exec();
  }
  return this.find().populate('makeId').sort({ model: 1 }).exec();
};

modelSchema.statics.getById = function (id) {
  return this.findById(id).populate('makeId').exec();
};

modelSchema.statics.createModel = function (makeId, modelName) {
  const newModel = new this({ makeId, model: modelName });
  return newModel.save();
};

modelSchema.statics.updateModel = function (id, updates) {
  return this.findByIdAndUpdate(id, updates, { new: true }).populate('makeId').exec();
};

modelSchema.statics.deleteModel = function (id) {
  return this.findByIdAndDelete(id).exec();
};

const Model = mongoose.model('Model', modelSchema);

export default Model;
