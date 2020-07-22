'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const oe_officeModel = sequelize.define('oe_offices', {
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
        officeUserId: {
            type: Datatypes.INTEGER,
            allowNull: true
        }
    }, modelOptions);

    oe_officeModel.associate = function (models) {
        
       };
   
       return oe_officeModel;
}