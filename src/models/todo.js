'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING, 
    deletedAt: DataTypes.DATE
  }, {});

  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

  };
  return Todo;
};