const masterlists = require('../models').masterlists;
const jobs = require('../models').ph_jobs;
const jobMovements = require('../models').ph_jobsMovements;

const jobsController = {};

jobsController.getAllEmployees = (req, res) => {
  masterlists
    .findAll({
      where: req.query,
      attributes: ['id', 'altId', 'firstName', 'lastName'],
      include: [
        {
          where: {
            endDate: null,
          },
          model: jobMovements,
          attributes: ['id', 'jobId'],
          include: [
            {
              model: jobs,
              attributes: ['jobTitle', 'level'],
            },
          ],
        },
      ],
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res
        .status(406)
        .json({ message: 'Hubo un error contacte su administrador.' });
    });
};
