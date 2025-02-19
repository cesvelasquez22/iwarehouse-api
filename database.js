
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const Sequelize = require('sequelize');


let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  
const db = sequelize ;

module.exports = db;