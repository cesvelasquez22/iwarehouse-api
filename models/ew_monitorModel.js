'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const ew_monitorModel = sequelize.define('ew_monitors', {
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
        }
    }, modelOptions);

    ew_monitorModel.associate = function (models) {
        
       };
   
       return ew_monitorModel;
}