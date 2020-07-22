const express = require('express');
const passport = require('passport');
const strategy = require('../lib/jwt');

const router = express.Router();

router.get('/', function (req, res) {
    res.json({'Message':'The api is running.'});
});

passport.use(strategy.getStrategy());

module.exports = router;
