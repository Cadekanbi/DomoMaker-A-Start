
const models = require('../models');

const Quest = models.Quest;

const makerPage = (req, res) => {
  Quest.QuestModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), quests: docs });
  });
};

const makeQuest = (req, res) => {
  if (!req.body.name || !req.body.objective) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const questData = {
    name: req.body.name,
    objective: req.body.objective,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newQuest = new Quest.QuestModel(questData);

  const questPromise = newQuest.save();

  questPromise.then(() => res.json({ redirect: '/maker' }));

  questPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Quest already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return questPromise;
};

const removeQuest = (request, response) => {
  const req = request;
  const res = response;
  
  if (req.query.name) {
    return Quest.QuestModel.deleteQuest(req.session.account._id, req.query.name, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ 
          success: false,
          error: 'An error occured. Failed to remove Quest'
        });
      }
      console.log('Quest removed');
      return res.json({ success: true });
    });
  }

  return false;
};

const getQuests = (request, response) => {
  const req = request;
  const res = response;

  return Quest.QuestModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ quests: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getQuests = getQuests;
module.exports.make = makeQuest;
module.exports.removeQuest = removeQuest;
