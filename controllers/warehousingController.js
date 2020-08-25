const db = require('../database');
const cases = require('../models').we_cases;
const monitor = require('../models').we_monitors;
const projector = require('../models').we_projectors;

const warehousingController = {};

// Cases
warehousingController.createCase = (req, res) => {
  const obj = req.body.dataObj;
  if (!obj.serial || !obj.brand || !obj.model || !obj.inventoryCode) {
    res.json({
      message: 'Faltan campos requeridos.',
    });
  } else {
    cases
      .findOne({
        where: {
          inventoryCode: obj.inventoryCode,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return cases.create(obj).then(() => {
              res.status(201).json({
                message: 'Se agregó el case correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message: 'Ya existe este registro! Intenta con un uno diferente.',
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

warehousingController.getCase = (req, res) => {
  let id = req.params.id;

  cases
    .findOne({
      where: {
        id: id,
      },
      attributes: [
        'id',
        'serial',
        'brand',
        'model',
        'macAddress',
        'inventoryCode',
        'processorType',
        'ramMemory',
        'diskSpace',
        'guarantee',
        'equipmentStatus',
        'notes',
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

warehousingController.getCases = (req, res) => {
  cases
    .findAll({
      where: req.query,
      attributes: [
        'id',
        'serial',
        'brand',
        'model',
        'macAddress',
        'inventoryCode',
        'processorType',
        'ramMemory',
        'diskSpace',
        'guarantee',
        'equipmentStatus',
        'notes',
      ],
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

warehousingController.updateCase = (req, res) => {
  let id = parseInt(req.params.id, 10);

  let data = req.body.data;

  let object = {
    serial: data.serial,
    brand: data.brand,
    model: data.model,
    macAddress: data.macAddress,
    inventoryCode: data.inventoryCode,
    processorType: data.processorType,
    ramMemory: data.ramMemory,
    diskSpace: data.diskSpace,
    guarantee: data.guarantee,
    equipmentStatus: data.equipmentStatus,
    notes: data.notes,
  };

  cases
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

// Monitors
warehousingController.createMonitor = (req, res) => {
  const obj = req.body.dataObj;
  if (!obj.serial || !obj.brand || !obj.model || !obj.inventoryCode) {
    res.json({
      message: 'Faltan campos requeridos.',
    });
  } else {
    monitor
      .findOne({
        where: {
          inventoryCode: obj.inventoryCode,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return monitor.create(obj).then(() => {
              res.status(201).json({
                message: 'Se agregó el monitor correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message:
              'Ya existe este registro! Intenta con un nombre diferente.',
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

warehousingController.getMonitor = (req, res) => {
  let id = req.params.id;

  monitor
    .findOne({
      where: {
        id: id,
      },
      attributes: [
        'id',
        'serial',
        'brand',
        'model',
        'inventoryCode',
        'equipmentStatus',
        'notes',
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

warehousingController.getMonitors = (req, res) => {
  monitor
    .findAll({
      where: req.query,
      attributes: [
        'id',
        'serial',
        'brand',
        'model',
        'inventoryCode',
        'equipmentStatus',
        'notes',
      ],
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

warehousingController.updateMonitor = (req, res) => {
  let id = parseInt(req.params.id, 10);

  let data = req.body.data;

  let object = {
    serial: data.serial,
    brand: data.brand,
    model: data.model,
    inventoryCode: data.inventoryCode,
    equipmentStatus: data.equipmentStatus,
    notes: data.notes,
  };

  monitor
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

// Projectors
warehousingController.createProjector = (req, res) => {
  const obj = req.body.dataObj;
  if (!obj.serial || !obj.brand || !obj.model || !obj.inventoryCode) {
    res.json({
      message: 'Faltan campos requeridos.',
    });
  } else {
    projector
      .findOne({
        where: {
          inventoryCode: obj.inventoryCode,
        },
      })
      .then((exists) => {
        if (!exists) {
          db.sync().then(() => {
            return projector.create(obj).then(() => {
              res.status(201).json({
                message: 'Se agregó el proyector correctamente',
              });
            });
          });
        } else {
          res.status(400).json({
            message:
              'Ya existe este registro! Intenta con un nombre diferente.',
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

warehousingController.getProjector = (req, res) => {
    let id = req.params.id;
  
    projector
      .findOne({
        where: {
          id: id,
        },
        attributes: [
          'id',
          'serial',
          'brand',
          'model',
          'inventoryCode',
          'guarantee',
          'equipmentStatus',
          'notes',
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
  
  warehousingController.getProjectors = (req, res) => {
    projector
      .findAll({
        where: req.query,
        attributes: [
          'id',
          'serial',
          'brand',
          'model',
          'inventoryCode',
          'guarantee',
          'equipmentStatus',
          'notes',
        ],
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
  
  warehousingController.updateProjector = (req, res) => {
    let id = parseInt(req.params.id, 10);
  
    let data = req.body.data;
  
    let object = {
      serial: data.serial,
      brand: data.brand,
      model: data.model,
      inventoryCode: data.inventoryCode,
      guarantee: data.guarantee,
      equipmentStatus: data.equipmentStatus,
      notes: data.notes,
    };
  
    projector
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

module.exports = warehousingController;
