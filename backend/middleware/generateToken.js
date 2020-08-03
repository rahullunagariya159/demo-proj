const jwt = require('jsonwebtoken');
const SECRETKEY = 'qwerty@1234';

const generateToken = async (data) => {
	console.log('call');
	const token = await jwt.sign(data, SECRETKEY, {});
	if (token) {
		return { token: token };
	} else {
		return { error: 'something want wrong ' };
	}
};

exports.generateToken = generateToken;
