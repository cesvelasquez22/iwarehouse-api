const express = require('express');
const passport = require('passport');
const strategy = require('../lib/jwt');

const warehousingController = require('../controllers/warehousingController');
const masterController = require('../controllers/masterlistController');
const AuthController = require('../controllers/authController');
const jobsController = require('../controllers/jobsController');
const officeEquipmentController = require('../controllers/officeEquipmentController');

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ Message: 'The api is running.' });
});

passport.use(strategy.getStrategy());

// Employees
// Masterlist
router.get(
  '/employees',
  passport.authenticate('jwt', { session: false }),
  masterController.getAllEmployees
);
router.get(
  '/employees/:id',
  passport.authenticate('jwt', { session: false }),
  masterController.getEmployee
);
router.post(
  '/employees',
  passport.authenticate('jwt', { session: false }),
  masterController.createNewEmployee
);
router.put(
  '/employees/:id',
  passport.authenticate('jwt', { session: false }),
  masterController.updateEmployeeInformation
);
// Jobs
router.get('/jobs', jobsController.getEmployeeJobs);

// Warehousing
// Cases
router.get(
  '/cases',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getCases
);
router.get(
  '/cases/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getCase
);
router.post(
  '/cases',
  passport.authenticate('jwt', { session: false }),
  warehousingController.createCase
);
router.put(
  '/cases/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.updateCase
);
// Monitors
router.get(
  '/monitors',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getMonitors
);
router.get(
  '/monitors/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getMonitor
);
router.post(
  '/monitors',
  passport.authenticate('jwt', { session: false }),
  warehousingController.createMonitor
);
router.put(
  '/monitors/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.updateMonitor
);
// Projectors
router.get(
  '/projectors',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getProjectors
);
router.get(
  '/projectors/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.getProjector
);
router.post(
  '/projectors',
  passport.authenticate('jwt', { session: false }),
  warehousingController.createProjector
);
router.put(
  '/projectors/:id',
  passport.authenticate('jwt', { session: false }),
  warehousingController.updateProjector
);

// Office Equipment
// Departments
router.get(
  '/depts',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getDepartments
);
router.get(
  '/depts/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getDepartment
);
router.post(
  '/depts',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.createDepartment
);
router.put(
  'depts/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.updateDepartment
);
// Office Users
router.get(
  '/officeUsers',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getOfficeUsers
);
router.get(
  '/officeusers/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getOfficeUser
);
router.post(
  '/officeUsers',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.createOfficeUser
);
router.put(
  '/officeUsers/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.updateOfficeUser
);
// Offices
router.get(
  '/offices',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getOffices
);
router.get(
  '/offices/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getOffice
);
router.post(
  '/offices',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.createOffice
);
router.put(
  '/offices/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.updateOffice
);
// Classrooms
router.get(
  '/rooms',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getClassrooms
);
router.get(
  '/rooms/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getClassroom
);
router.post(
  '/rooms',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.createClassroom
);
router.put(
  '/rooms/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.updateClassroom
);
// Labs
router.get(
  '/labs',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getLabs
);
router.get(
  '/labs/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.getLab
);
router.post(
  '/labs',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.createLab
);
router.put(
  '/labs/:id',
  passport.authenticate('jwt', { session: false }),
  officeEquipmentController.updateLab
);

// Auth
router.post('/user', AuthController.createNewUser);
router.post('/auth', AuthController.authenticateUser);
// router.get('/user', AuthController.getUserByJwt);

module.exports = router;
