'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  const oe_officeUserModel = sequelize.define(
    'oe_officeUsers',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activeDirectoryUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    modelOptions
  );

  oe_officeUserModel.associate = function (models) {
    oe_officeUserModel.hasMany(models.oe_offices, {
      sourcekey: 'id',
      foreignKey: 'officeUserId',
    });
    oe_officeUserModel.belongsTo(models.oe_departments, {
      targetKey: 'id',
      foreignKey: 'departmentId',
    });
  };

  return oe_officeUserModel;
};
