'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model{

  }

  User.init({
    email: {
      type:DataTypes.STRING,
      unique:true,
      validate:{
        notEmpty:true
      }
    },
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  },{sequelize})

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food)
  };
  return User;
};