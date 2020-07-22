'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const ew_projectorModel = sequelize.define('ew_projectors', {
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
        }
    }, modelOptions);

    ew_projectorModel.associate = function (models) {
        
       };
   
       return ew_projectorModel;
}