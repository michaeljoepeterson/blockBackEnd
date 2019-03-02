const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const {Character} = require("../models/character");
const {User} = require("../models/user");
const {checkChars} = require("../tools/checkChars");
router.use(jwtAuth);

router.post("/",checkChars,(req,res) => {
	const userName = req.user.username;
	const {charName,gridData,animation} = req.body;
	console.log(req.body);
	//console.log(userName);
	return User.find({username:userName})
	.then(user => {
		const userId = user._id;
		return Character.create({
			charName:charName,
			owner:userId,
			gridData:gridData,
			animation:animation
		})
	})
	.then(character => {
		return res.status(201).json(character.serialize())
	})

	.catch(err => {
		console.log(err);
		if(err.reason === 'ValidationError'){
			return res.status(err.code).json(err);
		}

		res.status(500).json({code:500, message:'internal server error'});
	})
});

module.exports = {router};