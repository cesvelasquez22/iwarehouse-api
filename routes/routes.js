const express = require('express');
const passport = require('passport');
const strategy = require('../lib/jwt');

const warehousingController = require('../controllers/warehousingController');
const masterController =  require('../controllers/masterlistController');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/', function (req, res) {
    res.json({'Message':'The api is running.'});
});

passport.use(strategy.getStrategy());

// Employees
// Masterlist
router.get('/employees', masterController.getAllEmployees);
router.get('/employees/:id', masterController.getEmployee);
router.post('/employees', masterController.createNewEmployee);
router.put('/employees/:id', masterController.updateEmployeeInformation);
// Jobs

// Warehousing
// Cases
router.get('/cases', warehousingController.getCases);
router.get('/cases/:id', warehousingController.getCase);
router.post('/cases', warehousingController.createCase);
router.put('/cases/:id', warehousingController.updateCase);
// Monitors
router.get('/monitors', warehousingController.getMonitors);
router.get('/monitors/:id', warehousingController.getMonitor);
router.post('/monitors', warehousingController.createMonitor);
router.put('/monitors/:id', warehousingController.updateMonitor);
// Projectors
router.get('/projectors', warehousingController.getProjectors);
router.get('/projectors/:id', warehousingController.getProjector);
router.post('/projectors', warehousingController.createProjector);
router.put('/projectors/:id', warehousingController.updateProjector);

// Auth
router.post('/user', AuthController.createNewUser);
router.post('/auth', AuthController.authenticateUser);
// router.get('/user', AuthController.getUserByJwt);

module.exports = router;
