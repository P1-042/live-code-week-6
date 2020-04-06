const router = require('express').Router();
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

// AUTHENTICATION
router.post('/register', Controller.register);
router.post('/login', Controller.login);

// APP
router.post('/foods',authentication,Controller.addFood);
router.get('/foods',authentication,Controller.fetchFood);
router.delete('/foods/:id',authentication,authorization,Controller.delete)

module.exports = router