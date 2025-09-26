'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Todo, {
      foreignKey: 'user_id',
      as: 'todos'
    });
  };
  
  return User;
};