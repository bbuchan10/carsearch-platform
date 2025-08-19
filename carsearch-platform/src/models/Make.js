import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema({
  make: { type: String, required: true, unique: true },
  region: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'makes'
});

// ---------- Static Methods ----------

makeSchema.statics.getAll = function () {
  return this.find().sort({ make: 1 }).exec();
};

makeSchema.statics.getById = function (id) {
  return this.findById(id).exec();
};

makeSchema.statics.createMake = function (make, region) {
  const newMake = new this({ make, region });
  return newMake.save();
};

makeSchema.statics.updateMake = function (id, updates) {
  return this.findByIdAndUpdate(id, updates, { new: true }).exec();
};

makeSchema.statics.deleteMake = function (id) {
  return this.findByIdAndDelete(id).exec();
};

const Make = mongoose.model('Make', makeSchema);

export default Make;
