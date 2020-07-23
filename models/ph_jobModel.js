'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  const ph_jobModel = sequelize.define(
    'ph_jobs',
    {
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    modelOptions
  );

  ph_jobModel.associate = function (models) {
    ph_jobModel.hasMany(models.ph_jobMovements, {
      sourceKey: 'id',
      foreignKey: 'jobId',
    });
  };
  return ph_jobModel;
};
