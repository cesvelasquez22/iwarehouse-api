'use strict';

module.exports = (sequelize, Datatypes) => {
    const modelOptions = {
        define: {
            freezeTable: true,
        }
    }

    const oe_classRoomModel = sequelize.define('oe_classRooms', {
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
    }, modelOptions);

    oe_classRoomModel.associate = function (models) {
        
       };
   
       return oe_classRoomModel;
}