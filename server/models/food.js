'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Food extends Model {}
  Food.init({
    title : {
      type: Sequelize.STRING,
      validate: {notEmpty : true}
    },
    price: {
      type: Sequelize.INTEGER,
      validate: {notEmpty: true}
    },
    ingredients: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    tag: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    UserId: {
      type: Sequelize.INTEGER,
      validate: {notEmpty: true}
    }
  },{sequelize})


  // const Food = sequelize.define('Food', {
  //   title: DataTypes.STRING,
  //   price: DataTypes.INTEGER,
  //   ingredients: DataTypes.STRING,
  //   tag: DataTypes.STRING,
  //   UserId: DataTypes.INTEGER,
  // }, {});
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Food;
};