'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const we_monitorModel = sequelize.define(
    'we_monitors',
    {
      serial: {
        type: Datatypes.STRING,
        allowNull: true,
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

  we_monitorModel.associate = function (models) {
    we_monitorModel.hasMany(models.oe_classRooms, {
      sourceKey: 'id',
      foreignKey: 'monitorId',
    });
    we_monitorModel.hasMany(models.oe_labs, {
      sourceKey: 'id',
      foreignKey: 'monitorId',
    });
    we_monitorModel.hasMany(models.oe_offices, {
      sourceKey: 'id',
      foreignKey: 'monitorId',
    });
  };

  return we_monitorModel;
};
