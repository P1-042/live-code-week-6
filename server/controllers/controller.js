const {User,Food} = require('../models')
const {hashPassword,checkPassword} = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Controller{
  // register
  static register(req,res){
    User.create({
      email: req.body.email,
      password: hashPassword(req.body.password)
    })
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(500).json(user)
    })
  }

  // login
  static login(req,res){
    User.findOne({where:{email:req.body.email}})
    .then(user=>{
      if(user){
        if(checkPassword(req.body.password,user.password)){
          const token = jwt.sign({
            UserEmail: user.email,
            UserId: user.id
          }, process.env.TOKEN_KEY);
          res.status(200).json({access_token : token})
        }else{
          res.status(400).json({message: 'wrong password'})
        }
      }else{
        res.status(400).json({message: 'email not found'})
      }
    })
  }

  // add food
  static addFood(req,res){
    Food.create({
      title: req.body.title,
      price: req.body.price,
      ingredients: req.body.ingredients,
      tag: req.body.tag,
      UserId: req.UserId
    })
    .then(food=>{
      res.status(201).json(food)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  // fetch food
  static fetchFood(req,res){
    Food.findAll({where: { UserId:req.UserId}})
    .then(foods=>{
      res.status(200).json(foods)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = Controller