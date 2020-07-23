'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  var ga_groupModel = sequelize.define(
    'ga_groups',
    {
      group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    modelOptions
  );

  ga_groupModel.associate = function (models) {};

  return ga_groupModel;
};
