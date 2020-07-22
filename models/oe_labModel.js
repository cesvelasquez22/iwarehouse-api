'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const oe_labModel = sequelize.define('oe_labs', {
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
            allowNull: true
        }
    }, modelOptions);

    oe_labModel.associate = function (models) {
        
       };
   
       return oe_labModel;
}