const router = require('express').Router();
const Controller = require('../controllers/controller');
const authentication = require('../middlewares/authentication')

// AUTHENTICATION
router.post('/register', Controller.register);
router.post('/login', Controller.login);

// APP
router.post('/foods',authentication,Controller.addFood);
router.get('/foods',authentication,Controller.fetchFood)

module.exports = router