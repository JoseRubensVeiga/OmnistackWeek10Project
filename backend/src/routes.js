const { Router } = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController')

routes.get('/devs', DevController.index);
routes.get('/devs/:github_username', DevController.show);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

// Atividade opcional
// routes.put('/devs/:github_username', DevController.update);
routes.delete('/devs/:github_username', DevController.destroy);
module.exports = routes;