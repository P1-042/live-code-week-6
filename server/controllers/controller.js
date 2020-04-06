const {User,Food} = require('../models')


class Controller{
  static register(req,res){
    User.create({
      email: req.body.email,
      password: 
    })
  }
}

module.exports = Controller