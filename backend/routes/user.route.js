const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const SECRETKEY = 'qwerty@1234';

// const verifyToken = require('../middleware/verifyToken');

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
				(req.userData = data), next();
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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log('call destination');
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		console.log(file);
		const newFileName = Date.now() + path.extname(file.originalname);
		req.fileData = newFileName;
		cb(null, newFileName);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == 'image/jpeg' ||
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpg'
	) {
		console.log('call function file filter');
		cb(null, true);
	} else {
		console.log('else file filter');
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/deleteUser', verifyTheToken, user.deleteUser);
router.post('/upload', upload.single('image'), user.uploads);

module.exports = router;

// Module exports are the instruction that tells Node. js
// which bits of code (functions, objects, strings, etc.)
// to “export” from a given file so other files are allowed to access the exported code.
