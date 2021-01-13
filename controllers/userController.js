const db = require('../database');
const User = require('../models').ga_userRoles;
const employee = require('../models').masterlists;
const role = require('../models').ga_groups;

const userController = {};

userController.getUsers = (req, res) => {
  User.findAll({
    where: req.query,
    attributes: ['id', 'groupId', 'empId', 'authLevel', 'email', 'status'],
    include: [
      {
        model: role,
        attributes: ['id', 'group'],
      },
      {
        model: employee,
        attributes: ['id', 'altId', 'firstName', 'lastName', 'place'],
      },
    ],
  })
    .then((users) => {
      const userData = users.map((user) => {
        const { altId, firstName, lastName, place } = user.masterlist;
        const { group } = user.ga_group;
        return Object.assign(
          {},
          {
            idEmployee: altId,
            fullName: `${firstName} ${lastName}`,
            email: user.email,
            place: place,
            role: group,
            status: user.status,
          }
        );
      });
      res.json(userData);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message:
          'Hubo un error al obtener los usuarios por favor contactar su administrador.',
      });
    });
};

module.exports = userController;
