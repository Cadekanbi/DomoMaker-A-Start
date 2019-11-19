
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let QuestModel = {};

// function that converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setString = (name) => _.escape(name).trim();

const QuestSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    set: setString,
  },

  objective: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },

  description: {
    type: String,
    default: '',
    trim: true,
    set: setString,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

QuestSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  objective: doc.objective,
  description: doc.description,
});

QuestSchema.statics.deleteQuest = (ownerId, questName, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  if (questName == null) {
    return QuestModel.find(search).remove({ name: null }).exec(callback);
  }

  return QuestModel.find(search).remove({ name: questName }).exec(callback);
};

QuestSchema.statics.updateQuest = (ownerId, questData, callback) => {
  const search = {
    owner: convertId(ownerId),
    name: questData.name,
  };

  return QuestModel
    .find(search)
    .update({
      name: questData.newName,
      objective: questData.newObjective,
      description: questData.newDescription,
    })
    .exec(callback);
};

QuestSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return QuestModel.find(search).select('name objective description').exec(callback);
};

QuestModel = mongoose.model('Quest', QuestSchema);

module.exports.QuestModel = QuestModel;
module.exports.QuestSchema = QuestSchema;
