'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    hooks: {
      beforeValidate: hashPassword,
    },
    define: {
      freezeTableName: true,
    },
  };

  var ga_userRoleModel = sequelize.define(
    'ga_userRoles',
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      empId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      authLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    modelOptions
  );

  ga_userRoleModel.associate = function (models) {
    ga_userRoleModel.belongsTo(models.ga_groups, {
      targetKey: 'id',
      foreignKey: 'groupId',
    });
    ga_userRoleModel.belongsTo(models.masterlists, {
      targetKey: 'id',
      foreignKey: 'empId',
    });
  };

  ga_userRoleModel.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  };

  function hashPassword(user) {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(function (password) {
        user.password = password;
      });
    }
  }

  return ga_userRoleModel;
};
