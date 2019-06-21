const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('./database');

/*
 Called by app.js to build JwtStrategy for user profile access
*/
module.exports = function(passport) {
 let ops = {};
 ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
 ops.secretOrKey = config.secret;
 passport.use(new JwtStrategy(ops, (jwt_payload, done) => {
   User.getUserById(jwt_payload.data._id, (err, user) => {
     if(err) {
       return done(err, false);
     }
     
     if(user) {
       return done(null, user);
     } else {
       return done(null, false);
     }
   });
 }));
}

