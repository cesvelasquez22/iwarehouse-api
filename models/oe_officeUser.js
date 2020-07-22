'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  const officeUserModel = sequelize.define(
    'officeUsers',
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
      emailAddress: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      activeDirectoryUser: DataTypes.STRING,
      extNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    modelOptions
  );

  officeUserModel.associate = function (models) {};

  return officeUserModel;
};
