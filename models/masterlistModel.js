'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  const masterlistModel = sequelize.define(
    'masterlists',
    {
      altId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: DataTypes.STRING,
      phone1: DataTypes.STRING,
      phone2: DataTypes.STRING,
      profileImgUrl: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    modelOptions
  );

  masterlistModel.associate = function (models) {
    masterlistModel.hasMany(models.ph_jobMovements, { sourceKey: 'id', foreignKey: 'empId' });
  };

  return masterlistModel;
};
