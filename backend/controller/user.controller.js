const user = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = require('../middleware/generateToken');

const slatRounds = 10;

generateHash = (text) => {
	return bcrypt.hashSync(text, bcrypt.genSaltSync(slatRounds), null);
};

verify = (password, DBpassword) => {
	return bcrypt.compareSync(password, DBpassword);
};

exports.register = async (req, res) => {
	console.log('register req body', req.body);

	if (req.body == undefined || req.body == null || req.body == {}) {
		res.json({
			code: 404,
			status: 'error',
			message: 'Please provide proper fields',
		});
	} else {
		const alreadyExist = await user.findOne({ email: req.body.email });

		if (alreadyExist) {
			res.json({
				code: 403,
				status: 'error',
				message: 'This email address alreadt exist!',
			});
		} else {
			let newUser = new user();

			newUser.email = req.body.email;
			console.log(generateHash(req.body.password));
			newUser.password = generateHash(req.body.password);

			const regNewuser = await newUser.save();

			if (regNewuser) {
				res.json({
					code: 202,
					status: 'success',
					message: 'User register successfully',
				});
			} else {
				res.json({
					code: 403,
					status: 'error',
					message: 'something want wrong,please try again!',
				});
			}
		}
	}
};

exports.login = async (req, res) => {
	console.log('login req body data', req.body);

	if (req.body.email && req.body.password) {
		const findUser = await user.findOne({ email: req.body.email });

		if (findUser) {
			if (verify(req.body.password, findUser.password)) {
				const data = {
					_id: findUser._id,
					email: findUser.email,
					password: findUser.password,
				};

				const token = await generateToken.generateToken(data);

				if (token.token) {
					res.json({
						status: 'success',
						code: 200,
						authToken: token.token,
						message: 'Login successfull',
					});
					console.log(token);
				} else {
					res.json({
						status: 'error',
						code: 403,
						message: 'Something want wrong,please try again!',
					});
				}
			} else {
				res.json({
					status: 'error',
					code: 403,
					message: 'Password is wrong',
				});
			}
		} else {
			res.json({
				status: 'error',
				code: 404,
				message: 'user not found!',
			});
		}
	} else {
		res.json({
			status: 'error',
			code: 403,
			message: 'Please provide proper information!',
		});
	}
};

exports.deleteUser = async (req, res) => {
	console.log('delete user route', req.body);
	console.log('request user data', req.userData);
	// console.log('request user data', req.userData.email);
	if (req.body.deleteUserID) {
		const findExists = await user.findOne({ _id: req.body.deleteUserID });

		if (findExists) {
			const deleteUser = await user
				.find({ _id: req.body.deleteUserID })
				.remove()
				.exec();

			if (deleteUser) {
				res.json({
					status: 'success',
					code: 202,
					message: 'record deleted successfully',
				});
			} else {
				res.json({
					status: 'error',
					code: 403,
					message: 'Record not deleted please try again!',
				});
			}
		} else {
			res.json({
				status: 'error',
				code: 403,
				message: 'User not found!',
			});
		}
	} else {
		res.json({
			status: 'error',
			code: 403,
			message: 'please provide user for delete!',
		});
	}
};

exports.uploads = async (req, res) => {
	console.log('calll');
	console.log('request body', req.body.name);
	console.log('request body', req.fileData);
	try {
		return res.json({
			code: 202,
			status: 'success',
			message: 'file uploaded successfully',
		});
	} catch (error) {
		console.log(error);
	}
};
