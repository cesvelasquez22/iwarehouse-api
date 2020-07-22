'use strict';

module.exports = (sequelize, DataTypes) => {

     const modelOptions = {
      define: {
        freezeTableName: true
          }
    };

    var ph_jobMovementModel = sequelize.define('ph_jobMovements', {
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      empId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    }, modelOptions);

    ph_jobMovementModel.associate = function(models) {
  };

    return ph_jobMovementModel;
};