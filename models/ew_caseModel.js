'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const ew_caseModel = sequelize.define('ew_cases', {
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
        macAddress: {
            type: Datatypes.STRING,
            allowNull: true,
        },
        inventoryCode: {
            type: Datatypes.STRING,
            allowNull: true,
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
        }
    }, modelOptions);

    ew_caseModel.associate = function (models) {
        
       };
   
       return ew_caseModel;
}