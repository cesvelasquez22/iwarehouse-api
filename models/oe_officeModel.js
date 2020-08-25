'use strict';

module.exports = (sequelize, Datatypes) => {
  const modelOptions = {
    define: {
      freezeTable: true,
    },
  };

  const oe_officeModel = sequelize.define(
    'oe_offices',
    {
      caseId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      monitorId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      officeUserId: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      computerName: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      macAddress: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      ipAddress: {
        type: Datatypes.STRING,
        allowNull: true,
      },
    },
    modelOptions
  );

  oe_officeModel.associate = function (models) {
    oe_officeModel.belongsTo(models.we_cases, {
      targetKey: 'id',
      foreignKey: 'caseId',
    });
    oe_officeModel.belongsTo(models.we_monitors, {
      targetKey: 'id',
      foreignKey: 'monitorId',
    });
    oe_officeModel.belongsTo(models.oe_officeUsers, {
      targetKey: 'id',
      foreignKey: 'officeUserId',
    });
  };

  return oe_officeModel;
};
