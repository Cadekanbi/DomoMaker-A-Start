
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getQuests', mid.requiresLogin, controllers.Quest.getQuests);
  app.get('/removeQuest', mid.requiresLogin, controllers.Quest.removeQuest);
  app.get('/updateQuest', mid.requiresLogin, controllers.Quest.updateQuest);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/app', mid.requiresLogin, controllers.Quest.appPage);
  app.post('/app', mid.requiresLogin, controllers.Quest.makeQuest);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
