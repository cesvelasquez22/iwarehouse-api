//JSON Web Token Logic
const passportJWT = require('passport-jwt');
var fs = require('fs');
const config = require('./config');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const User = require('../models').ga_userRoles;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.keys.secret;

var jwtObject = {};

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

// lets create our strategy for web token
jwtOptions.strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    //console.log('payload received', jwt_payload);

    let user = getUser({ id: jwt_payload.payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

jwtObject.getSecret = function () {
    return jwtOptions.secretOrKey;
};

jwtObject.getStrategy = function () {
    return jwtOptions.strategy;
};

module.exports = jwtObject;