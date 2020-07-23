'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const oe_classRoomModel = sequelize.define(
    'oe_classRooms',
    {
      altId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      caseId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      monitorId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      projectorId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      ipAddress: {
        type: Datatypes.STRING,
        allowNull: true,
      },
    },
    modelOptions
  );

  oe_classRoomModel.associate = function (models) {
    oe_classRoomModel.hasMany(models.oe_labs, {
      sourcekey: 'id',
      foreignKey: 'classRoomId',
    });
    oe_classRoomModel.belongsTo(models.we_cases, {
      targetKey: 'id',
      foreignKey: 'caseId',
    });
    oe_classRoomModel.belongsTo(models.we_monitors, {
      targetKey: 'id',
      foreignKey: 'monitorId',
    });
    oe_classRoomModel.belongsTo(models.we_projectors, {
      targetKey: 'id',
      foreignKey: 'projectorId',
    });
  };

  return oe_classRoomModel;
};
