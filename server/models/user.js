'use strict';

const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model {}
  User.init({
    email : {
      type: Sequelize.STRING,
      validate: {notEmpty : true}
    },
    password: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }
  },{
    hooks: {
      beforeCreate(instance, options) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      },
    }, sequelize
  })

  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food, {foreignKey: 'UserId'})
  };
  return User;
};