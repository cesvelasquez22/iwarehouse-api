'use strict';

module.exports = (sequelize, DataTypes) => {
  const modelOptions = {
    define: {
      freezeTableName: true,
    },
  };

  const oe_departmentModel = sequelize.define(
    'oe_departments',
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

  oe_departmentModel.associate = function (models) {
    oe_departmentModel.hasMany(models.oe_officeUsers, {
      sourcekey: 'id',
      foreignKey: 'departmentId',
    });
  };

  return oe_departmentModel;
};
