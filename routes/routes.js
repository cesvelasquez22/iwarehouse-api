const express = require('express');
const passport = require('passport');
const strategy = require('../lib/jwt');

const warehousingController = require('../controllers/warehousingController');
const masterController = require('../controllers/masterlistController');
const AuthController = require('../controllers/authController');
const jobsController = require('../controllers/jobsController');
const officeEquipmentController = require('../controllers/officeEquipmentController');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ Message: 'The api is running.' });
});

passport.use(strategy.getStrategy());

// Users
router.get('/users', userController.getUsers);

// Roles
// router.get('/roles', passport.authenticate('jwt', { session: false }), roleController.getAllRoles);
router.get('/roles', roleController.getAllRoles);

// Auth
router.post('/auth/create', AuthController.createNewUser);
router.post('/auth', AuthController.authenticateUser);
// router.get('/user', AuthController.getUserByJwt);

module.exports = router;
