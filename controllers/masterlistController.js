const masterlists = require('../models').masterlists;
const db = require('../database');

const masterController = {};

masterController.createNewEmployee = (req, res) => {
  let obj = req.body.dataObj;
  if (
    !obj.altId ||
    !obj.uid ||
    !obj.firstName ||
    !obj.lastName ||
    !obj.birthdate ||
    !obj.gender ||
    !obj.place ||
    !obj.addressLine1 ||
    !obj.phone1 ||
    !obj.status
  ) {
    res.json({
      message: 'Faltan campos requeridos.',
    });
  } else {
    masterlists
      .findOne({
        where: {
          altId: obj.altId,
        },
      })
      .then((user) => {
        if (!user) {
          db.sync().then(() => {
            return masterlists.create(obj).then(() => {
              res.status(201).json({
                message: 'El asociado fue creado exitosamente.',
              });
            });
          });
        } else {
          res.status(400).json({
            message: 'El asociado ya existe.',
          });
        }
      })
      .catch((error) => {
        res.status(403).json({
          message: res.json({
            message:
              'Hubo un error inesperado por favor contactar su administrador.',
          }),
        });
      });
  }
};

masterController.getAllEmployees = (req, res) => {
  masterlists
    .findAll({
      where: req.query,
      attributes: [
        'id',
        'altId',
        'uid',
        'firstName',
        'lastName',
        'birthdate',
        'gender',
        'place',
        'addressLine1',
        'phone1',
        'phone2',
        'profileImgUrl',
        'status',
      ],
    })
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

masterController.getEmployee = (req, res) => {
  const id = req.params.id;

  masterlists
    .findOne({
      where: {
        id: id,
      },
      attributes: [
        'id',
        'altId',
        'uid',
        'firstName',
        'lastName',
        'birthdate',
        'gender',
        'place',
        'addressLine1',
        'phone1',
        'phone2',
        'profileImgUrl',
        'status',
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: 'Hubo un error inesperado, favor contacte a su administrador',
      });
    });
};

masterController.updateEmployeeInformation = (req, res) => {
  let id = parseInt(req.params.id, 10);
//Sirve para convertir la información encriptada a partir de su token
//let data = JSON.parse(req.body.data);
  let data = req.body.data;
//let data = JSON.parse(req.body.data);

  let object = {
    altId: data.altId,
    uid: data.uid,
    firstName: data.firstName,
    lastName: data.lastName,
    birthdate: data.birthdate,
    gender: data.gender,
    place: data.place,
    addressLine1: data.addressLine1,
    phone1: data.phone1,
    phone2: data.phone2,
    profileImgUrl: data.profileImgUrl,
    status: data.status,
  };
  masterlists
    .update(object, {
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.status(200).json({
        message: res.json({
          message: 'La informacion fue exitosamente actualizada.',
        }),
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: res.json({
          message:
            'Hubo un error inesperado por favor contactar su administrador.',
        }),
      });
    });
};

module.exports = masterController;