const {Food} = require('../models')

function authorization(req,res,next){
  Food.findOne({
    where:{
      id :req.params.id
    }
  })
  .then(food=>{
    if(food){
      if(food.UserId == req.UserId){
        next()
      }else{
        res.status(400).json({message: 'unauthorized'})
      }
    }else{
      res.status(400).json({message: 'food not found'})
    }
  })
}

module.exports = authorization