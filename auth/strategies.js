const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy,ExtractJwt} = require ('passport-jwt');
const {User} = require('../models/user');
const {JWT_SECRET,JWT_EXPIRY} = require('../config');