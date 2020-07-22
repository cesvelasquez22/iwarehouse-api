'use strict';

module.exports = (sequelize, DataTypes) => {

     const modelOptions = {
        define: {
            freezeTableName: true
        }
    };

    const ph_job = sequelize.define('ph_jobs', {
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, modelOptions);

    ph_job.associate = function(models){
    };
    return ph_job;
}
   