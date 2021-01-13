const db = require('../database');
const role = require('../models').ga_groups;

const roleController = {};

roleController.getAllRoles = (req, res) => {
    role
      .findAll({
        where: req.query,
        attributes: [
          'id',
          'group',
        ],
      })
      .then((roles) => {
        res.json(roles);
      })
      .catch((error) => {
        res.json({
          message:
            'Hubo un error inesperado por favor contactar su administrador.',
        });
      });
  };

  module.exports = roleController;