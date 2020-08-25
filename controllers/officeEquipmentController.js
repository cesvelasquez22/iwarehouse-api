const db = require('../database');
const departments = require('../models').oe_departments;
const officeUsers = require('../models').oe_officeUsers;

// Warehousing
const cases = require('../models').we_cases;
const monitors = require('../models').we_monitors;
const projectors = require('../models').we_projectors;

// Office equipment
const offices = require('../models').oe_offices;
const classRooms = require('../models').oe_classRooms;
const labs = require('../models').oe_labs;

const officeEquipmentController = {};

// Departments
officeEquipmentController.createDepartment = (req, res) => {
  const obj = req.body.dataObj;
  if (!obj.deptCode || !obj.deptName) {
    res.json({
      message: 'Faltan campos requeridos',
    });
  } else {
    departments
      .findOne({
        where: {
          deptCode: obj.deptCode,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return departments.create(obj).then(() => {
              res.status(201).json({
                message: 'Se agregó el departamento correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message:
              'Ya existe este departamento! Intenta con un uno diferente.',
          });
        }
      })
      .catch((err) => {
        res.status(403).json({
          message:
            'Ha ocurrido un error inesperado, contacte su administrador.',
        });
      });
  }
};

officeEquipmentController.getDepartment = (req, res) => {
  let id = req.params.id;

  departments
    .findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'deptCode', 'deptName'],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

officeEquipmentController.getDepartments = (req, res) => {
  departments
    .findAll({
      where: req.query,
      attributes: ['id', 'deptCode', 'deptName'],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

officeEquipmentController.updateDepartment = (req, res) => {
  let id = parseInt(req.params.id, 10);

  let data = req.body.data;

  let object = {
    deptCode: data.deptCode,
    deptName: data.deptName,
  };

  departments
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

// Office users
officeEquipmentController.createOfficeUser = (req, res) => {
  const obj = req.body.dataObj;
  if (
    !obj.firstName ||
    !obj.lastName ||
    !obj.departmentId ||
    !obj.emailAddress
  ) {
    res.json({
      message: 'Faltan campos requeridos',
    });
  } else {
    officeUsers
      .findOne({
        where: {
          emailAddress: obj.emailAddress,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return officeUsers.create(obj).then(() => {
              res.status(201).json({
                message: 'Se agregó el usuario de oficina correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message:
              'Ya existe este usuario de oficina! Intenta con un uno diferente.',
          });
        }
      })
      .catch((err) => {
        res.status(403).json({
          message:
            'Ha ocurrido un error inesperado, contacte su administrador.',
        });
      });
  }
};

officeEquipmentController.getOfficeUser = (req, res) => {
  let id = req.params.id;

  officeUsers
    .findOne({
      where: {
        id: id,
      },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'departmentId',
        'emailAddress',
        'phoneNumber',
        'activeDirectoryuser',
        'extNumber',
      ],
      include: [
        {
          model: departments,
          attributes: ['id', 'deptCode', 'deptName'],
        },
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

officeEquipmentController.getOfficeUsers = (req, res) => {
  officeUsers
    .findAll({
      where: req.query,
      attributes: [
        'id',
        'firstName',
        'lastName',
        'departmentId',
        'emailAddress',
        'phoneNumber',
        'activeDirectoryuser',
        'extNumber',
      ],
      include: [
        {
          model: departments,
          attributes: ['id', 'deptCode', 'deptName'],
        },
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

officeEquipmentController.updateOfficeUser = (req, res) => {
  let id = parseInt(req.params.id, 10);

  let data = req.body.data;

  let object = {
    firstName: data.firstName,
    lastName: data.lastName,
    departmentId: data.departmentId,
    emailAddress: data.emailAddress,
    phoneNumber: data.phoneNumber,
    activeDirectoryuser: data.activeDirectoryuser,
    extNumber: data.extNumber,
  };

  officeUsers
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

// Offices
officeEquipmentController.createOffice = (req, res) => {
  const obj = req.body.dataObj;
  if (!obj.caseId || !obj.monitorId || !obj.officeUserId) {
    res.json({
      message: 'Faltan campos requeridos',
    });
  } else {
    offices
      .findOne({
        where: {
          officeUserId: obj.officeUserId,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return offices.create(obj).then(() => {
              res.status(201).json({
                message: 'Se asignó el equipo de oficina correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message: 'El usuario seleccionado ya tiene equipo asignado',
          });
        }
      })
      .catch((err) => {
        res.status(403).json({
          message:
            'Ha ocurrido un error inesperado, contacte su administrador.',
        });
      });
  }
};

officeEquipmentController.getOffices = (req, res) => {
  offices
    .findAll({
      where: req.query,
      attributes: [
        'id',
        'caseId',
        'monitorId',
        'officeUserId',
        'computerName',
        'ipAddress',
      ],
      include: [
        {
          model: cases,
          attributes: [
            'id',
            'serial',
            'brand',
            'model',
            'inventoryCode',
            'processorType',
            'ramMemory',
            'diskSpace',
          ],
        },
        {
          model: monitors,
          attributes: ['id', 'serial', 'brand', 'model', 'inventoryCode'],
        },
        {
          model: officeUsers,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'departmentId',
            'emailAddress',
            'phoneNumber',
            'activeDirectoryuser',
            'extNumber',
          ],
          include: [
            {
              model: departments,
              attributes: ['id', 'deptCode', 'deptName'],
            },
          ],
        },
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

officeEquipmentController.getOffice = (req, res) => {
  let id = req.params.id;
  offices
    .findOne({
      where: {
        id: id
      },
      attributes: [
        'id',
        'caseId',
        'monitorId',
        'officeUserId',
        'computerName',
        'ipAddress',
      ],
      include: [
        {
          model: cases,
          attributes: [
            'id',
            'serial',
            'brand',
            'model',
            'inventoryCode',
            'processorType',
            'ramMemory',
            'diskSpace',
          ],
        },
        {
          model: monitors,
          attributes: ['id', 'serial', 'brand', 'model', 'inventoryCode'],
        },
        {
          model: officeUsers,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'departmentId',
            'emailAddress',
            'phoneNumber',
            'activeDirectoryuser',
            'extNumber',
          ],
          include: [
            {
              model: departments,
              attributes: ['id', 'deptCode', 'deptName'],
            },
          ],
        },
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message:
          'Hubo un error inesperado por favor contactar su administrador.',
      });
    });
};

module.exports = officeEquipmentController;
