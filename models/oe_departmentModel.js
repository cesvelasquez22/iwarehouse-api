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
      deptCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      deptName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    modelOptions
  );

  officeUserModel.associate = function (models) {};

  return officeUserModel;
};
