const jwt = require('jsonwebtoken');
const SECRETKEY = 'qwerty@1234';

const verifyTheToken = (req, res, next) => {
	console.log('calll');
	const bearer = req.headers['authorization'];

	if (bearer) {
		const token = bearer;

		jwt.verify(token, SECRETKEY, (err, data) => {
			if (err) {
				res.json({
					status: 'error',
					code: 403,
					message: 'token not valid',
				});
			} else {
				req.userData = data;
				next();
			}
		});
	} else {
		res.json({
			status: 'error',
			code: 404,
			message: 'token  not found',
		});
	}
};

exports.verifyToken = verifyTheToken;

// let myFunc1 = function() { ... };
// let myFunc2 = function() { ... };
// exports.myFunc1 = myFunc1;
// exports.myFunc2 = myFunc2;

// const m = require('./mymodule');
// m.myFunc1();
