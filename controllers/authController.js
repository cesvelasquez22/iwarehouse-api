const jwt = require('jsonwebtoken');
const config = require('../lib/config');
const db = require('../database');
const User = require('../models').ga_userRoles;

const AuthController = {};

// Create a new user
AuthController.createNewUser = (req, res) => {
  let gid = parseInt(req.body.groupId, 10);
  let uid = parseInt(req.body.empId, 10);

  if (
    !req.body.groupId ||
    !req.body.empId ||
    !req.body.authLevel ||
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.status
  ) {
    res.json({
      message: 'Please provide a username, email and a password.',
    });
  } else {
    db.sync()
      .then(() => {
        const newUser = {
          groupId: gid,
          empId: uid,
          authLevel: req.body.authLevel,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          hash: 'SecretHashHere',
          status: req.body.status,
          createdBy: 'getCurrentUserHere',
        };

        return User.create(newUser).then(() => {
          res.status(201).json({
            message: 'Account created!',
          });
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          message: 'Hubo un error inesperado, contacte su administrador.',
        });
      });
  }
};

// get user.
AuthController.getUserByJwt = (req, res) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers['authorization'].replace(/^Bearer\s/, '');
      let decoded;
      decoded = jwt.verify(token, config.keys.secret);
      // Fetch the user by id
      User.findOne({ _username: decoded.username }).then(function (user) {
        // Do something with the user
        res.status(200).json({
          user,
        });
      });
    }
  };
  
  // Authenticate a user.
  AuthController.authenticateUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.status(404).json({
        message: 'Username and password are needed!',
      });
    } else {
      const username = req.body.username;
      const password = req.body.password;
      const potentialUser = {
        where: {
          username,
        },
      };
      User.findOne(potentialUser)
        .then((user) => {
          if (!user) {
            res.status(404).json({
              message: 'El correo que ingreso no es valido.',
            });
          } else {
            user.comparePasswords(password, (error, isMatch) => {
              if (isMatch && !error) {
                let payload = { id: user.id, user: user.username };
                let token = jwt.sign({ payload }, config.keys.secret, {
                  expiresIn: '2h',
                });
                console.log(token);
                res.json({
                  Success: true,
                  Token: `Bearer ${token}`,
                  Role: user.role,
                });
              } else {
                res.status(404).json({
                  message: 'La contraseña que ingreso no es valida.',
                });
              }
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            message: 'There was an error! Please contact your administrator!',
          });
        });
    }
  };

  module.exports = AuthController;
