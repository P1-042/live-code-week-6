const jwt = require('jsonwebtoken');
require('dotenv').config()

function authentication(req,res,next){
  try{
    const token = req.headers.access_token;
    if(token){
      const decoded = jwt.verify(token,process.env.TOKEN_KEY)
      req.UserId = decoded.UserId;
      req.UserEmail = decoded.UserEmail;
      next();
    }else{
      res.status(400).json({message: 'token not found'})
    }
  }catch(err){
    res.status(500).json(err)
  }
}

module.exports = authentication