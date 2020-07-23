'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const oe_labModel = sequelize.define(
    'oe_labs',
    {
      classRoomId: {
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
      ipAddress: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      tagNumber: {
        type: Datatypes.INTEGER,
        allowNull: true,
      },
    },
    modelOptions
  );

  oe_labModel.associate = function (models) {
    oe_labModel.belongsTo(models.oe_classRooms, {
      targetKey: 'id',
      foreignKey: 'classRoomId',
    });
    oe_labModel.belongsTo(models.we_cases, {
      targetKey: 'id',
      foreignKey: 'caseId',
    });
    oe_labModel.belongsTo(models.we_monitors, {
      targetKey: 'id',
      foreignKey: 'monitorId',
    });
  };

  return oe_labModel;
};
