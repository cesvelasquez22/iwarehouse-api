'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const we_projectorModel = sequelize.define(
    'we_projectors',
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

  we_projectorModel.associate = function (models) {
    we_projectorModel.hasMany(models.oe_classRooms, {
      sourceKey: 'id',
      foreignKey: 'projectorId',
    });
  };

  return we_projectorModel;
};
