'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const we_caseModel = sequelize.define(
    'we_cases',
    {
      serial: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      brand: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      model: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      inventoryCode: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      processorType: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      ramMemory: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      diskSpace: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      guarantee: {
        type: Datatypes.BOOLEAN,
        allowNull: true,
      },
      equipmentStatus: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      notes: {
        type: Datatypes.STRING,
        allowNull: true,
      },
    },
    modelOptions
  );

  we_caseModel.associate = function (models) {
    we_caseModel.hasMany(models.oe_classRooms, {
      sourceKey: 'id',
      foreignKey: 'caseId',
    });
    we_caseModel.hasMany(models.oe_labs, {
      sourceKey: 'id',
      foreignKey: 'caseId',
    });
    we_caseModel.hasMany(models.oe_offices, {
      sourceKey: 'id',
      foreignKey: 'caseId',
    });
  };

  return we_caseModel;
};
