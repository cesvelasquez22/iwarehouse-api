const masterlists = require('../models').masterlists;
const jobs = require('../models').ph_jobs;
const jobMovements = require('../models').ph_jobMovements;

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

jobsController.getEmployeeJobs = (req, res) => {
  masterlists
    .findAll({
      where: req.query,
      attributes: ['id', 'altId', 'firstName', 'lastName'],
      include: [
        {
          //limit: 1,
          model: jobMovements,
          where: {
            endDate: null,
          },
          attributes: ['id', 'jobId', 'startDate', 'endDate'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: jobs,
              attributes: ['jobTitle', 'level'],
            },
          ],
        },
      ],
    })
    .then((employee) => {
      const resObj = employee.map((emp) => {
        return Object.assign(
          {},
          {
            altId: emp.altId,
            name: emp.firstName + ' ' + emp.lastName,
            job: emp.ph_jobMovements.map((mov) => {
              return Object.assign(
                {},
                {
                  id: mov.id,
                  jobId: mov.jobId,
                  jobTitle: mov.ph_job.jobTitle,
                  level: mov.ph_job.level,
                  startDate: mov.startDate,
                  endDate: mov.endDate,
                }
              );
            }),
          }
        );
      });
      res.json(resObj);
    })
    .catch((error) => {
      console.log(error);
      res.status(406).json({
        message: 'Hubo un error inesperado contacte su administrador.',
      });
    });
};

module.exports = jobsController;
