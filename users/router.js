const express = require("express");
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
//const {checkChars} = require('../checkChars');
const passport = require('passport');
const router = express.Router();
const {checkUser} = require('./checkUser');

router.post('/',checkUser,(req,res) => {
	let {username,password} = req.body;
	return User.find({username})

	.then(user => {
		return User.hashPassword(password);
	})
	.then(hash => {
		return User.create({
			username,
			password:hash
		});
	})
	.then(user => {
		return res.status(201).json(user.serialize());
	})
	.catch(err => {
		if(err.reason === 'ValidationError'){
			return res.status(err.code).json(err);
		}
		if(err.code === 11000){

			return res.status(422).json({
				code:422,
				reason:"ValidationError",
				message:"Name already taken"
			})
		}

		res.status(500).json({code:500, message:'internal server error'});
	});
});

module.exports = {router};